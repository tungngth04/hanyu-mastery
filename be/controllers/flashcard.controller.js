const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Flashcard = require('../models/flashcard.model');
const { status: httpStatus } = require('http-status');
const { updateLastStudied } = require('./userDeckProgress.controller');

const getFlashcardByDeckId = catchAsync(async (req, res) => {
  const { deckId } = req.params;
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const flashcards = await Flashcard.aggregate([
    {
      $match: {
        deckId: new mongoose.Types.ObjectId(deckId),
        userId: userId,
      },
    },

    {
      $lookup: {
        from: 'vocabularies',
        localField: 'vocabularyId',
        foreignField: '_id',
        as: 'vocabulary',
      },
    },

    {
      $addFields: {
        vocabulary: { $arrayElemAt: ['$vocabulary', 0] },
      },
    },

    {
      $group: {
        _id: '$vocabulary._id',
        hanzi: { $first: '$vocabulary.hanzi' },
        pinyin: { $first: '$vocabulary.pinyin' },
        meaning: { $first: '$vocabulary.meaning' },
        example: { $first: '$vocabulary.example' },
        exampleMeaning: { $first: '$vocabulary.exampleMeaning' },
        level: { $first: '$vocabulary.level' },
        status: { $last: '$status' },
      },
    },
  ]);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy vocabulary theo deck thành công',
    data: flashcards,
  });
});

const updateFlashcardStatus = catchAsync(async (req, res) => {
  const { vocabularyId } = req.params;
  const { status, deckId } = req.body;
  const userId = req.user._id;

  const updated = await Flashcard.findOneAndUpdate(
    {
      vocabularyId: new mongoose.Types.ObjectId(vocabularyId),
      userId,
      deckId: new mongoose.Types.ObjectId(deckId),
    },
    { status },
    { new: true },
  );
  await updateLastStudied(userId, deckId);

  res.json({
    code: 200,
    message: 'Cập nhật thành công',
    data: updated,
  });
});

module.exports = { getFlashcardByDeckId, updateFlashcardStatus };
