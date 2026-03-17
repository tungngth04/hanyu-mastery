const mongoose = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');
const gTTS = require('gtts');
const Vocabulary = require('../models/vocabulary.model');

mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

const workbook = XLSX.readFile('C:/hanyu-mastery/be/data/hsk1.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

async function seedData() {
  for (const item of data) {
    const hanzi = item['Từ mới'];
    const audioPath = `audio/${hanzi}.mp3`;

    // tạo audio nếu chưa có
    if (!fs.existsSync(audioPath)) {
      const tts = new gTTS(hanzi, 'zh-cn');

      await new Promise((resolve) => {
        tts.save(audioPath, resolve);
      });
    }

    await Vocabulary.create({
      hanzi: hanzi,
      pinyin: item['Phiên âm'],
      meaning: item['Giải thích'],
      example: item['Ví dụ (chữ hán)'],
      exampleMeaning: item['Dịch'],
      radical: item['radical'],
      topicId: item['topicId'],
      level: 2,
      audio: audioPath,
    });

    console.log('Inserted:', hanzi);
  }

  console.log('Done!');
  process.exit();
}

seedData();
