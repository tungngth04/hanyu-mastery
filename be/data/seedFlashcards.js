const mongoose = require('mongoose');

const Vocabulary = require('../models/vocabulary.model');
const Flashcard = require('../models/flashcard.model');

mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

const userId = new mongoose.Types.ObjectId('69b7719d02ae9d855c75a01f');

// Map deck theo level và chủ đề
const decks = {
  1: {
    basic: '69c0e5d3b700ca4448d78596',
    communication: '69c0e5d3b700ca4448d78597',
    food: '69c0e5d3b700ca4448d78598',
    family: '69c0e5d3b700ca4448d78599',
    timeNumber: '69c0e5d3b700ca4448d7859a',
    location: '69c0e5d3b700ca4448d7859b',
  },
  2: { restaurant: '69c0e5d3b700ca4448d7859e' },
  3: { travel: '69c0e5d3b700ca4448d7859d' },
  4: { work: '69c0e5d3b700ca4448d7859c' },
  5: { commerce: '69c0e5d3b700ca4448d7859f' },
  6: { idioms: '69c0e5d3b700ca4448d785a0' },
};

// Map hanzi vào từng chủ đề (level 1)
const hanziMap = {
  family: ['爸爸', '儿子', '家'],
  food: ['吃', '喝', '茶', '菜'],
  timeNumber: ['今天', '点', '分钟', '二', '八'],
  location: ['北京', '出租车', '飞机', '火车站'],
  communication: ['对不起', '不客气'],
};

async function seedFlashcards() {
  try {
    console.log('Đang lấy vocabulary...');

    const vocabularies = await Vocabulary.find();

    const flashcards = [];

    vocabularies.forEach((vocab) => {
      const levelDecks = decks[vocab.level];
      if (!levelDecks) return;

      const createFlashcard = (deckId) => {
        // tạo 2 bản: new và mastered
        flashcards.push({
          userId,
          deckId,
          vocabularyId: vocab._id,
          status: 'new',
        });
        flashcards.push({
          userId,
          deckId,
          vocabularyId: vocab._id,
          status: 'mastered',
        });
      };

      // flashcard cơ bản level 1
      if (vocab.level === 1 && levelDecks.basic) {
        createFlashcard(levelDecks.basic);
      }

      // check hanzi map level 1
      if (vocab.level === 1) {
        for (const [topic, hanziList] of Object.entries(hanziMap)) {
          if (hanziList.includes(vocab.hanzi) && levelDecks[topic]) {
            createFlashcard(levelDecks[topic]);
          }
        }
      }

      // Level > 1, gán thẳng vào deck
      if (vocab.level > 1) {
        for (const deckName in levelDecks) {
          createFlashcard(levelDecks[deckName]);
        }
      }
    });

    if (flashcards.length > 0) {
      await Flashcard.insertMany(flashcards);
    }

    console.log(`Đã tạo ${flashcards.length} flashcards (bao gồm new + mastered)`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedFlashcards();
