const mongoose = require('mongoose');

const Vocabulary = require('../models/vocabulary.model');
const Flashcard = require('../models/flashcard.model');

mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

const userId = new mongoose.Types.ObjectId('69b7719d02ae9d855c75a01f');

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

const hanziMap = {
  family: ['爸爸', '儿子', '家'],
  food: ['吃', '喝', '茶', '菜'],
  timeNumber: ['今天', '点', '分钟', '二', '八'],
  location: ['北京', '出租车', '飞机', '火车站'],
  communication: ['对不起', '不客气'],
};

async function seedFlashcards() {
  try {
    console.log('🧹 Xóa flashcard cũ...');
    await Flashcard.deleteMany({ userId }); // ✅ FIX 1

    console.log('📥 Đang lấy vocabulary...');
    const vocabularies = await Vocabulary.find();

    const flashcards = [];
    const uniqueSet = new Set(); // ✅ FIX 2

    const addFlashcard = (deckId, vocabId, status) => {
      const key = `${userId}-${deckId}-${vocabId}-${status}`;

      if (!uniqueSet.has(key)) {
        uniqueSet.add(key);
        flashcards.push({
          userId,
          deckId,
          vocabularyId: vocabId,
          status,
        });
      }
    };

    vocabularies.forEach((vocab) => {
      const levelDecks = decks[vocab.level];
      if (!levelDecks) return;

      const createFlashcard = (deckId) => {
        addFlashcard(deckId, vocab._id, 'new');
      };

      // level 1 basic
      if (vocab.level === 1 && levelDecks.basic) {
        createFlashcard(levelDecks.basic);
      }

      // level 1 theo topic
      if (vocab.level === 1) {
        for (const [topic, hanziList] of Object.entries(hanziMap)) {
          if (hanziList.includes(vocab.hanzi) && levelDecks[topic]) {
            createFlashcard(levelDecks[topic]);
          }
        }
      }

      // level > 1
      if (vocab.level > 1) {
        for (const deckName in levelDecks) {
          createFlashcard(levelDecks[deckName]);
        }
      }
    });

    if (flashcards.length > 0) {
      await Flashcard.insertMany(flashcards);
    }

    console.log(`✅ Đã tạo ${flashcards.length} flashcards (không duplicate)`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedFlashcards();
