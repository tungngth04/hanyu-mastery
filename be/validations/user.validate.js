const joi = require('joi');
const { password } = require('./custom.validation');
const changePassword = {
  body: joi.object({
    oldPassword: joi.string().required().messages({
      'any.required': 'Vui lòng nhập mật khẩu cũ',
      'string.empty': 'Mật khẩu cũ không được để trống',
    }),

    newPassword: joi.string().required().custom(password).messages({
      'any.required': 'Vui lòng nhập mật khẩu mới',
    }),

    confirmPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
      'any.only': 'Mật khẩu xác nhận không khớp',
      'any.required': 'Vui lòng nhập lại mật khẩu',
    }),
  }),
};

module.exports = {
  changePassword,
};
