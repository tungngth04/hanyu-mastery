const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    questionNumber: Number,

    part: {
      type: Number,
      default: 1,
    },

    type: {
      type: String,
      enum: [
        'true_false',
        'single_choice',
        'multiple_choice',
        'fill_word',
        'sentence_order',
        'sentence_writing',
        'essay',
        'ordering',
      ],
    },

    question: String,

    paragraph: String,

    options: [String],

    image: String,

    correctAnswer: mongoose.Schema.Types.Mixed,

    explanation: String,

    audioStart: Number,
    audioEnd: Number,

    score: {
      type: Number,
      default: 1,
    },

    aiGrading: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const sectionSchema = new mongoose.Schema(
  {
    name: String,

    key: {
      type: String,
      enum: ['listening', 'reading', 'writing'],
    },

    duration: Number,

    totalQuestions: Number,

    audio: {
      type: String,
      default: '',
    },

    questions: [questionSchema],
  },
  { _id: false },
);

const hskExamSchema = new mongoose.Schema(
  {
    title: String,

    code: String,

    level: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6],
    },

    year: String,

    totalQuestions: Number,

    totalDuration: Number,

    totalScore: {
      type: Number,
      default: 300,
    },

    passingScore: {
      type: Number,
      default: 180,
    },

    sections: [sectionSchema],

    isMock: {
      type: Boolean,
      default: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('HSKExam', hskExamSchema);
