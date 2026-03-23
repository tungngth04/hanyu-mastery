const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const FlashcardDeck = require('../models/flashcard_deck.model');
const User_Deck_Progress = require('../models/user_deck_progress.model');
const { formatLastStudied } = require('../helpers/lastStudied');
const { calculateStreak } = require('../helpers/calculateStreak');

const getAllFlashcardDeck = catchAsync(async (req, res) => {
  const { pageSize = 10, page = 1, search = '', level } = req.query;
  const skip = (+page - 1) * +pageSize;

  const userId = req.user._id;

  const matchStage = {
    $match: {
      ...(level &&
        level !== 'Tất cả' && {
          level: Number(level.replace('HSK ', '')), // "HSK 1" -> 1
        }),
      ...(search && {
        $or: [{ title: { $regex: search, $options: 'i' } }, { topic: { $regex: search, $options: 'i' } }],
      }),
    },
  };
  const flashcardDecks = await FlashcardDeck.aggregate([
    {
      $sort: { level: 1 },
    },
    matchStage,
    {
      $lookup: {
        from: 'flashcards',
        let: { deckId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$deckId', '$$deckId'] }, { $eq: ['$userId', userId] }],
              },
            },
          },
        ],
        as: 'flashcards',
      },
    },

    {
      $lookup: {
        from: 'user_deck_progress',
        let: { deckId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$deckId', '$$deckId'] }, { $eq: ['$userId', userId] }],
              },
            },
          },
        ],
        as: 'progress',
      },
    },

    {
      $addFields: {
        progress: { $arrayElemAt: ['$progress', 0] },
      },
    },
    {
      $addFields: {
        cards: { $size: '$flashcards' },

        completed: {
          $size: {
            $filter: {
              input: '$flashcards',
              as: 'card',
              cond: { $eq: ['$$card.status', 'mastered'] },
            },
          },
        },

        lastStudied: '$progress.lastStudied',
      },
    },

    {
      $project: {
        flashcards: 0,
        progress: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: +pageSize,
    },
  ]);

  const totalResultsAgg = await FlashcardDeck.aggregate([
    matchStage,
    {
      $count: 'total',
    },
  ]);

  const totalResults = totalResultsAgg[0]?.total || 0;
  const formatted = flashcardDecks.map((deck) => ({
    ...deck,
    level: `HSK ${deck.level}`,
    lastStudied: formatLastStudied(deck.lastStudied),
  }));

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách FlashcardDeck thành công',
    data: {
      flashcardDecks: formatted,
      pageSize: +pageSize,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +pageSize),
      totalResults,
    },
  });
});

const getFlashcardStats = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const statsAgg = await FlashcardDeck.aggregate([
    {
      $lookup: {
        from: 'flashcards',
        let: { deckId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$deckId', '$$deckId'] }, { $eq: ['$userId', userId] }],
              },
            },
          },
        ],
        as: 'flashcards',
      },
    },

    {
      $addFields: {
        cards: { $size: '$flashcards' },
        completed: {
          $size: {
            $filter: {
              input: '$flashcards',
              as: 'card',
              cond: { $eq: ['$$card.status', 'mastered'] },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCards: { $sum: '$cards' },
        totalCompleted: { $sum: '$completed' },
      },
    },
  ]);

  const totalCards = statsAgg[0]?.totalCards || 0;
  const totalCompleted = statsAgg[0]?.totalCompleted || 0;

  const progress = totalCards === 0 ? 0 : Math.round((totalCompleted / totalCards) * 100);

  const progressDocs = await User_Deck_Progress.find({ userId }).select('lastStudied');

  const streak = calculateStreak(progressDocs);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy thống kê thành công',
    data: {
      totalCards,
      totalCompleted,
      progress: `${progress}%`,
      streak: `${streak} ngày liên tục`,
    },
  });
});

module.exports = { getAllFlashcardDeck, getFlashcardStats };
