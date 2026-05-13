/* eslint-disable no-unused-vars */
const Pinyin = require('../models/pinyin.model');
const { buildPinyin } = require('../utils/pinyin');
const { initialSoundMap } = require('../utils/pinyinSoundMap');
const { textToSpeech } = require('../utils/tts');
const uploadToS3 = require('../utils/uploadToS3');
const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '../audio/combine');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

async function createAudio(text, filePath) {
  const tts = new gTTS(text, 'zh-cn');

  await new Promise((resolve, reject) => {
    tts.save(filePath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
const getPinyin = async (req, res) => {
  try {
    const data = await Pinyin.findOne();

    return res.json({
      code: 200,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Lỗi server',
    });
  }
};

// ghép + audio
const combine = async (req, res) => {
  try {
    let { initial = '', final, tone } = req.body;
    tone = Number(tone);

    if (!final || !tone) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu final hoặc tone',
      });
    }

    const pinyinText = buildPinyin(initial, final, tone);

    if (!pinyinText) {
      return res.status(500).json({
        code: 500,
        message: 'buildPinyin lỗi',
      });
    }

    const db = await Pinyin.findOne();

    if (!db) {
      return res.status(500).json({
        code: 500,
        message: 'Không tìm thấy Pinyin DB',
      });
    }

    if (db.combinedAudio?.[pinyinText]) {
      return res.json({
        code: 200,
        data: {
          pinyin: pinyinText,
          audio: db.combinedAudio[pinyinText],
        },
      });
    }

    const fileName = `combine_${pinyinText}.mp3`;
    const filePath = path.join(audioDir, fileName);

    await createAudio(pinyinText, filePath);
    const url = await uploadToS3(filePath, `pinyin/combine/${fileName}`);

    fs.unlinkSync(filePath);

    db.combinedAudio = {
      ...(db.combinedAudio || {}),
      [pinyinText]: url,
    };

    db.markModified('combinedAudio');
    await db.save();

    return res.json({
      code: 200,
      data: {
        pinyin: pinyinText,
        audio: url,
      },
    });
  } catch (err) {
    console.error('COMBINE ERROR:', err);
    return res.status(500).json({
      code: 500,
      message: err.message || 'Lỗi combine',
    });
  }
};

module.exports = {
  getPinyin,
  combine,
};
