const mongoose = require('mongoose');

const grammarTopicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    level: String,
    orderIndex: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('GrammarTopic', grammarTopicSchema);
