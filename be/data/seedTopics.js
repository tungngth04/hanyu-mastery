const mongoose = require('mongoose');
const VocabularyTopic = require('../models/vocabulary_topic.model');

const MONGO_URI = 'mongodb+srv://tungnt:WRqDFlKtlbpIwY0P@ntung.cfv0v.mongodb.net/hanyu-mastery';

const topics = [
  {
    name: 'Ăn uống',
    description: 'Từ vựng về đồ ăn và thức uống',
  },
  {
    name: 'Hoạt động',
    description: 'Động từ chỉ hành động',
  },
  {
    name: 'Đồ vật',
    description: 'Các đồ vật thường gặp',
  },
  {
    name: 'Tính từ',
    description: 'Từ miêu tả',
  },
  {
    name: 'Ngữ pháp',
    description: 'Trợ từ và cấu trúc câu',
  },
  {
    name: 'Gia đình',
    description: 'Thành viên gia đình',
  },
  {
    name: 'Con người',
    description: 'Đại từ nhân xưng',
  },
  {
    name: 'Địa điểm',
    description: 'Địa điểm và thành phố',
  },
  {
    name: 'Thời gian',
    description: 'Ngày giờ',
  },
  {
    name: 'Số đếm',
    description: 'Số và lượng từ',
  },
  {
    name: 'Trường học',
    description: 'Học tập',
  },
  {
    name: 'Xã hội',
    description: 'Giao tiếp xã hội',
  },
];

async function seedTopics() {
  try {
    await mongoose.connect(MONGO_URI);

    await VocabularyTopic.insertMany(topics);

    console.log('✅ Topics created successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding topics:', error);
    process.exit(1);
  }
}

seedTopics();
