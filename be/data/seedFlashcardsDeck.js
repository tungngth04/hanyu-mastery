const mongoose = require('mongoose');
const FlashcardDeck = require('../models/flashcard_deck.model');

mongoose.connect('mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery');

async function seedDecks() {
  try {
    await FlashcardDeck.deleteMany({ isSystem: true });

    const decks = [
      {
        title: 'HSK1 Cơ bản',
        topic: 'Từ vựng cơ bản HSK1',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Giao tiếp',
        topic: 'Các từ dùng trong giao tiếp',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Đồ ăn & sinh hoạt',
        topic: 'Từ vựng về ăn uống và sinh hoạt',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Gia đình',
        topic: 'Từ vựng về gia đình',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Thời gian & số',
        topic: 'Số đếm và thời gian',
        level: 1,
        isSystem: true,
      },
      {
        title: 'HSK1 Địa điểm & di chuyển',
        topic: 'Địa điểm và phương tiện',
        level: 1,
        isSystem: true,
      },
      {
        title: 'Ôn tập HSK 4 - Cấp tốc',
        topic: 'Công việc & Xã hội',
        level: 4,
        isSystem: true,
      },
      {
        title: 'Từ vựng Du lịch - Tây Tạng',
        topic: 'Du lịch & Văn hóa',
        level: 3,
        isSystem: true,
      },
      {
        title: 'Giao tiếp Nhà hàng',
        topic: 'Ăn uống & Giao tiếp',
        level: 2,
        isSystem: true,
      },
      {
        title: 'Cụm từ Thương mại',
        topic: 'Kinh tế & Thương mại',
        level: 5,
        isSystem: true,
      },
      {
        title: 'Thành ngữ Cổ điển',
        topic: 'Văn hóa & Thành ngữ',
        level: 6,
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
