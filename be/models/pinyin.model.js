const mongoose = require('mongoose');

const pinyinSchema = new mongoose.Schema({
  initials: [String],
  finals: [String],
  tones: [
    {
      id: Number,
      mark: String,
      name: String,
      desc: String,
    },
  ],

  initialAudio: {
    type: Object,
    default: {},
  },

  finalAudio: {
    type: Object,
    default: {},
  },

  toneAudio: {
    type: Object,
    default: {},
  },

  combinedAudio: {
    type: Object,
    default: {},
  },
});

module.exports = mongoose.model('Pinyin', pinyinSchema, 'pinyin');
