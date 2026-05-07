const joi = require('joi');
const { objectId } = require('./custom.validation');

const getAllVocabulary = {
  query: joi.object({
    topicId: joi.string().custom(objectId).optional(),
    sortBy: joi.string().optional(),
    pageSize: joi.number().integer().min(1).default(10),
    page: joi.number().integer().min(1).default(1),
  }),
};

const createVocabulary = {
  body: joi.object({
    hanzi: joi.string().trim().required().messages({
      'any.required': 'Hanzi là bắt buộc',
    }),

    pinyin: joi.string().allow('').optional(),

    meaning: joi.string().trim().required().messages({
      'any.required': 'Nghĩa là bắt buộc',
    }),

    example: joi.string().allow('').optional(),
    exampleMeaning: joi.string().allow('').optional(),

    level: joi.number().integer().min(1).max(6).optional(),

    strokeCount: joi.number().integer().min(0).optional(),

    radical: joi.string().allow('').optional(),

    audio: joi.string().uri().allow('').optional(),

    topicId: joi.string().custom(objectId).required().messages({
      'any.required': 'TopicId là bắt buộc',
    }),
  }),
};

const updateVocabulary = {
  params: joi.object({
    id: joi.string().custom(objectId).required(),
  }),

  body: joi
    .object({
      hanzi: joi.string().trim().optional(),
      pinyin: joi.string().allow('').optional(),
      meaning: joi.string().trim().optional(),
      example: joi.string().allow('').optional(),
      exampleMeaning: joi.string().allow('').optional(),
      level: joi.number().integer().min(1).max(6).optional(),
      strokeCount: joi
        .number()
        .integer()
        .min(0)
        .optional()
        .custom((value) => Number(value)),
      radical: joi.string().allow('').optional(),
      audio: joi.string().uri().allow('').optional(),
      topicId: joi.string().custom(objectId).optional(),
    })
    .min(1)
    .messages({
      'object.min': 'Phải có ít nhất 1 trường để cập nhật',
    }),
};

const deleteVocabulary = {
  params: joi.object({
    id: joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  getAllVocabulary,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
