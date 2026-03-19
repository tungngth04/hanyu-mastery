const joi = require('joi');
const { objectId } = require('./custom.validation');

const getAllVocabulary = {
  query: joi.object({
    topicId: joi.string().custom(objectId).optional(),
    sortBy: joi.string(),
    pageSize: joi.number().integer().min(1).default(10),
    page: joi.number().integer().min(1).default(1),
  }),
};

module.exports = { getAllVocabulary };
