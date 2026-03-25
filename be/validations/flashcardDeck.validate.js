const joi = require('joi');

const getAllFlashcardDeck = {
  query: joi.object({
    pageSize: joi.number().integer().min(1).default(10),
    page: joi.number().integer().min(1).default(1),

    search: joi.string().allow('').optional(),
    level: joi.string().optional(),
  }),
};

module.exports = { getAllFlashcardDeck };
