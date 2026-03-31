const mongoose = require('mongoose');

const pinyinSchema = new mongoose.Schema({
  initials: [String],
  finals: [String],
  tones: [Number],
});

const Pinyin = mongoose.model('Pinyin', pinyinSchema, 'pinyin');
module.exports = Pinyin;
