const mongoose = require('mongoose');

const vocabularyTopicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,
  },
  { timestamps: true },
);

const VocabularyTopic = mongoose.model('VocabularyTopic', vocabularyTopicSchema, 'vocabulary_topics');

module.exports = VocabularyTopic;
