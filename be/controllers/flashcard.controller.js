const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Flashcard = require('../models/flashcard.model');
const { status: httpStatus } = require('http-status');

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
      $project: {
        _id: '$vocabulary._id',
        hanzi: '$vocabulary.hanzi',
        pinyin: '$vocabulary.pinyin',
        meaning: '$vocabulary.meaning',
        example: '$vocabulary.example',
        exampleMeaning: '$vocabulary.exampleMeaning',
        status: '$status',
      },
    },
  ]);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy vocabulary theo deck thành công',
    data: flashcards,
  });
});

module.exports = { getFlashcardByDeckId };
