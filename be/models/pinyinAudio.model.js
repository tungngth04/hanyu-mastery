const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  text: { type: String, unique: true },
  audioUrl: String,
});

module.exports = mongoose.model('PinyinAudio', schema);
