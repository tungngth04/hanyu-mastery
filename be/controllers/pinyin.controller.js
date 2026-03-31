/* eslint-disable no-unused-vars */
const Pinyin = require('../models/pinyin.model');
const { buildPinyin } = require('../utils/pinyin');
const { initialSoundMap } = require('../utils/pinyinSoundMap');
const { textToSpeech } = require('../utils/tts');

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
    const { initial = '', final, tone } = req.body;

    if (!final) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu final',
      });
    }

    const pinyin = buildPinyin(initial, final, tone);
    const audio = await textToSpeech(pinyin, `${pinyin}.wav`);

    return res.json({
      code: 200,
      data: {
        pinyin,
        audio,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Lỗi combine',
    });
  }
};

// phát âm thanh mẫu
const speakInitial = async (req, res) => {
  try {
    const { initial } = req.body;

    if (!initial) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu initial',
      });
    }

    const text = initialSoundMap[initial] || initial;
    const audio = await textToSpeech(text, `${initial}.wav`);

    return res.json({
      code: 200,
      data: audio,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Lỗi speakInitial',
    });
  }
};

// phát âm vận mẫu
const speakFinal = async (req, res) => {
  try {
    const { final } = req.body;

    if (!final) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu final',
      });
    }

    const audio = await textToSpeech(final, `${final}.wav`);

    return res.json({
      code: 200,
      data: audio,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Lỗi speakFinal',
    });
  }
};

// phát âm bất kỳ
const speak = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu text',
      });
    }

    const audio = await textToSpeech(text, `${text}.wav`);

    return res.json({
      code: 200,
      data: audio,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Lỗi speak',
    });
  }
};

module.exports = {
  getPinyin,
  combine,
  speakInitial,
  speakFinal,
  speak,
};
