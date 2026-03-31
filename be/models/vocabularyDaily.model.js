const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
  date: String,
  vocabularies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vocabulary',
    },
  ],
});

const VocabularyDaily = mongoose.model('VocabularyDaily', dailySchema, 'vocabulary_daily');

module.exports = VocabularyDaily;
