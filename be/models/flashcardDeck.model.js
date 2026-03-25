const mongoose = require('mongoose');

const flashcardDeckSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    topic: String,

    level: Number,

    lastStudied: Date,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const FlashcardDeck = mongoose.model('FlashcardDeck', flashcardDeckSchema, 'flashcard_decks');

module.exports = FlashcardDeck;
