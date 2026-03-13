const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const mailer = require('../utils/mailer');

const { status: httpStatus } = require('http-status');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const register = catchAsync(async (req, res) => {
  const existEmail = await User.findOne({ email: req.body.email });

  if (existEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Địa chỉ email đã tồn tại');
  }

  await User.create(req.body);

  const to = req.body.email;
  const subject = 'Đăng ký tài khoản thành công';
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2>Xin chào ${req.body.email}!</h2>  
        <h1 style="color: #4CAF50; text-align: center;">Chúc mừng bạn đã đăng ký thành công!</h1>
        <p style="color: #555555; font-size: 16px; text-align: center;">Bạn có thể bắt đầu sử dụng website của chúng tôi ngay bây giờ.</p>
      </div>
    </div>
  `;

  await mailer.sendMail(to, subject, htmlContent);

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Đăng ký người dùng thành công',
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.isMatchPassword(password))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tài khoàn hoặc mật khẩu không chính xác');
  }

  user.password = undefined;

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  res.status(httpStatus.OK).json({
    message: 'Đăng nhập thành công',
    code: httpStatus.OK,
    data: {
      user,
      accessToken,
      refreshToken,
    },
  });
});

module.exports = {
  register,
  login,
};
