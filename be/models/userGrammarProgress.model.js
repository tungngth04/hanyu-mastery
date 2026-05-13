// models/userGrammarProgress.model.js
const mongoose = require('mongoose');

const userGrammarProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GrammarLesson',
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    progressPercent: {
      type: Number,
      default: 0,
    },

    lastPosition: {
      type: Number,
      default: 0,
    },

    completedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserGrammarProgress', userGrammarProgressSchema);
