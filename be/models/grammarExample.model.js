// models/grammarExample.model.js
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: String,
  pinyin: String,
  meaning: String,
  audioUrl: String, // 🔥 audio từng từ
});

const grammarExampleSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GrammarLesson',
    },

    chinese: String,
    pinyin: String,
    vietnamese: String,
    audioUrl: String,

    words: [wordSchema],

    groupKey: String, // 🔥 key logic (machine)
    groupTitle: String, // 🔥 title hiển thị (UI)

    orderIndex: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('GrammarExample', grammarExampleSchema);
