const joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: joi.object({
    fullname: joi.string().min(2).max(45).required().messages({
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

module.exports = {
  register,
};
