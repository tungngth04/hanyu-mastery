const joi = require('joi');
const { objectId } = require('./custom.validation');

const getAllVocabulary = {
  query: joi.object({
    sortBy: joi.string(),
    pageSize: joi.number().integer().min(1).default(10),
    page: joi.number().integer().min(1).default(1),
  }),
};

const getVocabularyByTopicId = {
  params: joi.object({
    topicId: joi.string().required().custom(objectId),
  }),

  query: joi.object({
    pageSize: joi.number().integer().min(1).default(10),
    page: joi.number().integer().min(1).default(1),
  }),
};

module.exports = { getAllVocabulary, getVocabularyByTopicId };
