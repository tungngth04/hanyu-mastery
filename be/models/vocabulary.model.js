const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema(
  {
    hanzi: {
      type: String,
      required: true,
    },

    pinyin: String,

    meaning: String,

    example: String,

    exampleMeaning: String,

    level: Number,

    strokeCount: Number,

    radical: String,

    audio: String,

    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VocabularyTopic',
    },
  },
  { timestamps: true },
);

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema, 'vocabularies');

module.exports = Vocabulary;
