const joi = require('joi');

const getAllTopic = {
  query: joi.object({
    page: joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page phải là số',
      'number.min': 'Page phải >= 1',
    }),

    pageSize: joi.number().integer().min(1).default(10).messages({
      'number.base': 'PageSize phải là số',
      'number.min': 'PageSize phải >= 1',
    }),

    search: joi.string().allow('').optional(),
  }),
};

const createTopic = {
  body: joi.object({
    name: joi.string().trim().min(2).max(100).required().messages({
      'string.empty': 'Tên chủ đề không được để trống',
      'any.required': 'Tên chủ đề là bắt buộc',
      'string.min': 'Tên chủ đề phải có ít nhất 2 ký tự',
      'string.max': 'Tên chủ đề không vượt quá 100 ký tự',
    }),

    description: joi.string().allow('').max(255).optional().messages({
      'string.max': 'Mô tả không vượt quá 255 ký tự',
    }),
  }),
};

const updateTopic = {
  params: joi.object({
    id: joi.string().length(24).required().messages({
      'string.length': 'ID không hợp lệ',
      'any.required': 'ID là bắt buộc',
    }),
  }),

  body: joi
    .object({
      name: joi.string().trim().min(2).max(100).optional().messages({
        'string.min': 'Tên chủ đề phải có ít nhất 2 ký tự',
        'string.max': 'Tên chủ đề không vượt quá 100 ký tự',
      }),

      description: joi.string().allow('').max(255).optional().messages({
        'string.max': 'Mô tả không vượt quá 255 ký tự',
      }),
    })
    .min(1)
    .messages({
      'object.min': 'Phải có ít nhất 1 trường để cập nhật',
    }),
};

const deleteTopic = {
  params: joi.object({
    id: joi.string().length(24).required().messages({
      'string.length': 'ID không hợp lệ',
      'any.required': 'ID là bắt buộc',
    }),
  }),
};

module.exports = {
  getAllTopic,
  createTopic,
  updateTopic,
  deleteTopic,
};
