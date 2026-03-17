const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    deckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FlashcardDeck',
    },

    vocabularyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vocabulary',
    },

    status: {
      type: String,
      enum: ['new', 'mastered'],
      default: 'new',
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

flashcardSchema.index({
  userId: 1,
  deckId: 1,
  vocabularyId: 1,
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema, 'flashcards');

module.exports = Flashcard;
