const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PronunciationResult = require('../models/pronunciation.model');
const { convertToWav } = require('../helpers/convertToWav');
const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');

const speechKey = process.env.SPEECH_KEY;
const speechRegion = process.env.SPEECH_REGION;

const assessPronunciation = catchAsync(async (req, res) => {
  let tempInput, tempWav;
  console.log('FILE:', req.file);
  console.log('BODY:', req.body);
  try {
    const referenceText = req.body.text;
    const userId = req.user._id;

    let ext = path.extname(req.file.originalname);
    if (!ext) ext = '.webm';

    const allowedExt = ['.mp3', '.wav', '.webm', '.m4a'];
    if (!allowedExt.includes(ext.toLowerCase())) {
      return res.status(400).json({ message: 'Format audio không hỗ trợ' });
    }

    const fileName = `${Date.now()}-${Math.random()}`;

    tempInput = path.join(os.tmpdir(), fileName + ext);
    tempWav = path.join(os.tmpdir(), fileName + '.wav');

    fs.writeFileSync(tempInput, req.file.buffer);

    await convertToWav(tempInput, tempWav);

    const audioBuffer = fs.readFileSync(tempWav);

    const audioConfig = sdk.AudioConfig.fromWavFileInput(audioBuffer);

    const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
    speechConfig.speechRecognitionLanguage = 'zh-CN';

    const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
      referenceText,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true,
    );
    pronunciationConfig.enableProsodyAssessment = true;

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    pronunciationConfig.applyTo(recognizer);

    recognizer.recognizeOnceAsync(async (result) => {
      try {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          const detail = sdk.PronunciationAssessmentResult.fromResult(result);

          const pronunciation =
            detail.prosodyScore > 0
              ? detail.accuracyScore * 0.4 +
                detail.fluencyScore * 0.2 +
                detail.completenessScore * 0.2 +
                detail.prosodyScore * 0.2
              : detail.accuracyScore * 0.5 + detail.fluencyScore * 0.25 + detail.completenessScore * 0.25;

          const raw = result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);

          const json = JSON.parse(raw);

          // console.log('FULL RESULT:');
          // console.dir(json, { depth: null });

          const words = json.NBest?.[0]?.Words || [];

          const phonemeDetails = words.map((word) => ({
            word: word.Word,
            phonemes: word.Phonemes?.map((p) => ({
              phoneme: p.Phoneme,
              accuracy: p.PronunciationAssessment?.AccuracyScore || 0,
            })),
          }));

          const saved = await PronunciationResult.create({
            userId,
            text: referenceText,
            recognizedText: result.text,
            accuracy: detail.accuracyScore,
            fluency: detail.fluencyScore,
            completeness: detail.completenessScore,
            pronunciation: pronunciation,
            phonemes: phonemeDetails,
          });

          res.status(httpStatus.OK).json({
            code: httpStatus.OK,
            message: 'Chấm phát âm thành công',
            data: saved,
          });
        } else {
          res.status(httpStatus.BAD_REQUEST).json({
            error: 'Không nhận diện được giọng nói',
          });
        }
      } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
      } finally {
        try {
          if (tempInput && fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
          if (tempWav && fs.existsSync(tempWav)) fs.unlinkSync(tempWav);
          // eslint-disable-next-line no-unused-vars
        } catch (err) {
          res.status(httpStatus.BAD_REQUEST).json({
            error: 'Lỗi xoá file',
          });
        }

        recognizer.close();
      }
    });
  } catch (err) {
    try {
      if (tempInput && fs.existsSync(tempInput)) {
        fs.unlinkSync(tempInput);
      }
      if (tempWav && fs.existsSync(tempWav)) {
        fs.unlinkSync(tempWav);
      }
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

module.exports = { assessPronunciation };
