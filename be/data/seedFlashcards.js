const mongoose = require('mongoose');

const Vocabulary = require('../models/vocabulary.model');
const Flashcard = require('../models/flashcard.model');

mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

const userId = new mongoose.Types.ObjectId('69b7719d02ae9d855c75a01f');

const decks = {
  basic: '69b7d8d424251251bbfbdf94',
  communication: '69b7d8d424251251bbfbdf95',
  food: '69b7d8d424251251bbfbdf96',
  family: '69b7d8d424251251bbfbdf97',
  timeNumber: '69b7d8d424251251bbfbdf98',
  location: '69b7d8d424251251bbfbdf99',
};

async function seedFlashcards() {
  try {
    console.log('Đang lấy vocabulary...');

    const vocabularies = await Vocabulary.find({ level: 1 });

    const flashcards = [];

    vocabularies.forEach((vocab) => {
      // tất cả vào deck cơ bản
      flashcards.push({
        userId,
        deckId: decks.basic,
        vocabularyId: vocab._id,
      });

      // chia theo một số hanzi đơn giản
      if (['爸爸', '儿子', '家'].includes(vocab.hanzi)) {
        flashcards.push({
          userId,
          deckId: decks.family,
          vocabularyId: vocab._id,
        });
      }

      if (['吃', '喝', '茶', '菜'].includes(vocab.hanzi)) {
        flashcards.push({
          userId,
          deckId: decks.food,
          vocabularyId: vocab._id,
        });
      }

      if (['今天', '点', '分钟', '二', '八'].includes(vocab.hanzi)) {
        flashcards.push({
          userId,
          deckId: decks.timeNumber,
          vocabularyId: vocab._id,
        });
      }

      if (['北京', '出租车', '飞机', '火车站'].includes(vocab.hanzi)) {
        flashcards.push({
          userId,
          deckId: decks.location,
          vocabularyId: vocab._id,
        });
      }

      if (['对不起', '不客气'].includes(vocab.hanzi)) {
        flashcards.push({
          userId,
          deckId: decks.communication,
          vocabularyId: vocab._id,
        });
      }
    });

    await Flashcard.insertMany(flashcards);

    console.log(`Đã tạo ${flashcards.length} flashcards`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedFlashcards();
