const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    questionNumber: Number,

    sectionKey: String,

    userAnswer: mongoose.Schema.Types.Mixed,

    correctAnswer: mongoose.Schema.Types.Mixed,

    isCorrect: Boolean,

    score: Number,

    aiFeedback: String,
  },
  { _id: false },
);

const hskExamResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HSKExam',
    },

    answers: [answerSchema],

    listeningScore: Number,

    readingScore: Number,

    writingScore: Number,

    totalScore: Number,

    percentage: Number,

    isPassed: Boolean,

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    spentTime: Number,

    status: {
      type: String,
      enum: ['in_progress', 'submitted', 'graded'],
      default: 'submitted',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('HSKExamResult', hskExamResultSchema);
