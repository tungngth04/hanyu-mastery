const mongoose = require('mongoose');
const FlashcardDeck = require('../models/flashcard_deck.model');

mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

async function seedDecks() {
  try {
    await FlashcardDeck.deleteMany({ isSystem: true });

    const decks = [
      {
        title: 'HSK1 Cơ bản',
        description: 'Từ vựng cơ bản HSK1',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Giao tiếp',
        description: 'Các từ dùng trong giao tiếp',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Đồ ăn & sinh hoạt',
        description: 'Từ vựng về ăn uống và sinh hoạt',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Gia đình',
        description: 'Từ vựng về gia đình',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Thời gian & số',
        description: 'Số đếm và thời gian',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Địa điểm & di chuyển',
        description: 'Địa điểm và phương tiện',
        level: 1,
        isSystem: true,
      },
    ];

    await FlashcardDeck.insertMany(decks);

    console.log('Seed FlashcardDeck thành công');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDecks();
