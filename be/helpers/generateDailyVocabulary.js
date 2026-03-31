const Vocabulary = require('../models/vocabulary.model');
const VocabularyDaily = require('../models/vocabularyDaily.model');

const generateDailyVocabulary = async () => {
  const limit = 10;
  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  const exists = await VocabularyDaily.findOne({ date: today });
  if (exists) {
    console.log('Daily vocab already exists:', today);
    return;
  }

  const data = await Vocabulary.aggregate([{ $sample: { size: limit } }]);

  const ids = data.map((v) => v._id);

  const daily = await VocabularyDaily.create({
    date: today,
    vocabularies: ids,
  });

  await daily.populate('vocabularies');

  console.log('Created daily vocab:', today);
};

module.exports = generateDailyVocabulary;
