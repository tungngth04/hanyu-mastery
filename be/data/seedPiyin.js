const mongoose = require('mongoose');
const Pinyin = require('../models/pinyin.model');

async function seedPiyin() {
  await mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

  await Pinyin.deleteMany();

  await Pinyin.create({
    initials: [
      'b',
      'p',
      'm',
      'f',
      'd',
      't',
      'n',
      'l',
      'g',
      'k',
      'h',
      'j',
      'q',
      'x',
      'zh',
      'ch',
      'sh',
      'r',
      'z',
      'c',
      's',
      'y',
      'w',
    ],
    finals: [
      'a',
      'o',
      'e',
      'i',
      'u',
      'ü',
      'ai',
      'ei',
      'ao',
      'ou',
      'an',
      'en',
      'ang',
      'eng',
      'ong',
      'ia',
      'ie',
      'iao',
      'iu',
      'ian',
      'in',
      'iang',
      'ing',
      'ua',
      'uo',
      'uai',
      'ui',
      'uan',
      'un',
      'uang',
    ],
    tones: [1, 2, 3, 4, 5],
  });

  console.log('Seed done');
  process.exit();
}

seedPiyin();
