const mongoose = require('mongoose');

const grammarLessonSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GrammarTopic',
    },

    title: String,
    duration: Number,

    content: String,

    orderIndex: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('GrammarLesson', grammarLessonSchema);
