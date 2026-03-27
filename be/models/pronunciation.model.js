const mongoose = require('mongoose');

const phonemeSchema = new mongoose.Schema({
  phoneme: String,
  accuracy: Number,
});

const wordSchema = new mongoose.Schema({
  word: String,
  phonemes: [phonemeSchema],
});

const pronunciationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    text: String,

    audioUrl: String,

    accuracy: Number,
    fluency: Number,
    completeness: Number,
    prosody: Number,
    pronunciation: Number,

    recognizedText: String,
    phonemes: [wordSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Pronunciation', pronunciationSchema, 'pronunciation');
