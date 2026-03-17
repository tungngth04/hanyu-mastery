const mongoose = require('mongoose');

const Vocabulary = require('../models/vocabulary.model');
const Flashcard = require('../models/flashcard.model');

mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

const userId = new mongoose.Types.ObjectId('69b7719d02ae9d855c75a01f');

const decks = {
  basic: '69b8feb0597272be6199e5e0',
  communication: '69b8feb0597272be6199e5e1',
  food: '69b8feb0597272be6199e5e2',
  family: '69b8feb0597272be6199e5e3',
  timeNumber: '69b8feb0597272be6199e5e4',
  location: '69b8feb0597272be6199e5e5',
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
