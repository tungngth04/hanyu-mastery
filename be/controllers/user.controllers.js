const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const { status: httpStatus } = require('http-status');

const updateNotification = catchAsync(async (req, res) => {
  const { notification } = req.body;

  const user = await User.findByIdAndUpdate(req.user._id, { notification }, { new: true });

  const userObj = user.toObject();
  delete userObj.password;

  res.status(200).json({
    message: 'Cập nhật notification thành công',
    data: {
      user: userObj,
    },
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { fullName, email, learningGoal } = req.body;

  const user = await User.findByIdAndUpdate(req.user._id, { fullName, email, learningGoal }, { new: true });

  const userObj = user.toObject();
  delete userObj.password;

  res.status(200).json({
    message: 'Cập nhật hồ sơ thành công',
    data: {
      user: userObj,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  // check mật khẩu cũ
  const isMatch = await user.isMatchPassword(oldPassword);
  if (!isMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mật khẩu cũ không đúng');
  }

  // hash password mới
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  res.status(httpStatus.OK).json({
    message: 'Đổi mật khẩu thành công',
  });
});

module.exports = {
  updateNotification,
  updateProfile,
  changePassword,
};
