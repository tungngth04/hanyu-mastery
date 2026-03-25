const mongoose = require('mongoose');

const flashcardReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    vocabularyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vocabulary',
    },

    repetition: {
      type: Number,
      default: 0,
    },

    interval: {
      type: Number,
      default: 1,
    },

    easeFactor: {
      type: Number,
      default: 2.5,
    },

    nextReviewDate: Date,

    lastReviewedAt: Date,
  },
  { timestamps: true },
);

flashcardReviewSchema.index({
  userId: 1,
  vocabularyId: 1,
});

const FlashcardReview = mongoose.model('FlashcardReview', flashcardReviewSchema, 'flashcard_reviews');

FlashcardReview;
