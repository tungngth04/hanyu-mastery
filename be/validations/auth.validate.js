const joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: joi.object({
    fullName: joi.string().min(2).max(45).required().messages({
      'any.required': 'Vui lòng điền tên người dùng',
    }),
    email: joi.string().email().required().messages({
      'any.required': 'Vui lòng điền email',
    }),
    // password: joi.string().when('googleId', {
    //   is: joi.exist(),
    //   then: joi.optional(),
    //   otherwise: joi.required().custom(password),
    // }),
    // googleId: joi.string().optional(),
    password: joi.string().required().custom(password),
  }),
};

const login = {
  body: joi.object({
    email: joi.string().email().required().messages({
      'any.required': 'Vui lòng điền email',
    }),
    password: joi.string().required().custom(password),
  }),
};

const refreshToken = {
  body: joi.object({
    refreshToken: joi.string().required().messages({
      'any.required': 'Vui lòng điền refresh token',
    }),
    'string.empty': 'Refresh token không được để trống',
  }),
};
module.exports = {
  register,
  login,
  refreshToken,
};
