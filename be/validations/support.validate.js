const joi = require('joi');

const createSupport = {
  body: joi.object({
    fullName: joi.string().required().messages({
      'any.required': 'Vui lòng nhập họ và tên',
      'string.empty': 'Họ và tên không được để trống',
    }),
    email: joi.string().email().required().messages({
      'any.required': 'Vui lòng nhập email',
      'string.email': 'Email không hợp lệ',
    }),
    subject: joi.string().required().messages({
      'any.required': 'Vui lòng nhập vấn đề cần hỗ trợ',
      'string.empty': 'Vấn đề không được để trống',
    }),
    message: joi.string().required().messages({
      'any.required': 'Vui lòng nhập nội dung chi tiết',
      'string.empty': 'Nội dung không được để trống',
    }),
  }),
};

module.exports = {
  createSupport,
};
