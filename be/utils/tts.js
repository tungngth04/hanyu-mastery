const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const path = require('path');

const speechKey = process.env.SPEECH_KEY;
const speechRegion = process.env.SPEECH_REGION;

const folder = path.join(__dirname, '../public/audio');

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true });
}

function textToSpeech(text, fileName) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(folder, fileName);

    if (fs.existsSync(filePath)) {
      return resolve(`/audio/${fileName}`);
    }

    const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);

    speechConfig.speechSynthesisVoiceName = 'zh-CN-XiaoxiaoNeural';

    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filePath);

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      () => {
        synthesizer.close();
        resolve(`/audio/${fileName}`);
      },
      (err) => {
        synthesizer.close();
        reject(err);
      },
    );
  });
}

module.exports = { textToSpeech };
