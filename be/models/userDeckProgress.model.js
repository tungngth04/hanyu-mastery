const mongoose = require('mongoose');

const userDeckProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    deckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FlashcardDeck',
      required: true,
    },

    lastStudied: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

userDeckProgressSchema.index({ userId: 1, deckId: 1 }, { unique: true });

const UserDeckProgress = mongoose.model('UserDeckProgress', userDeckProgressSchema, 'user_deck_progress');

module.exports = UserDeckProgress;
