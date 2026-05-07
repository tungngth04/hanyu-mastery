const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { status: httpStatus } = require('http-status');
const cloudinary = require('../config/cloudinary');

const updateNotification = catchAsync(async (req, res) => {
  const { notification } = req.body;

  const user = await User.findByIdAndUpdate(req.user._id, { notification }, { new: true });

  const userObj = user.toObject();
  delete userObj.password;

  res.status(httpStatus.OK).json({
    message: 'Cập nhật notification thành công',
    data: {
      user: userObj,
    },
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { fullName, email, learningGoal, avatar, avatarPublicId } = req.body;

  const user = await User.findById(req.user._id);

  if (avatar && user.avatarPublicId) {
    await cloudinary.uploader.destroy(user.avatarPublicId);
  }

  const updateData = {
    fullName,
    email,
    learningGoal,
    ...(avatar && { avatar }),
    ...(avatarPublicId && { avatarPublicId }),
  };

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });

  const userObj = updatedUser.toObject();
  delete userObj.password;

  res.status(httpStatus.OK).json({
    message: 'Cập nhật hồ sơ thành công',
    data: {
      user: userObj,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  const isMatch = await user.isMatchPassword(oldPassword);
  if (!isMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mật khẩu cũ không đúng');
  }
  user.password = newPassword;

  await user.save();

  res.status(httpStatus.OK).json({
    message: 'Đổi mật khẩu thành công',
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({ deleted: false }).select('-password');

  res.status(httpStatus.OK).json({
    message: 'Lấy danh sách người dùng thành công',
    data: { users },
  });
});

const getUserDetail = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  res.status(httpStatus.OK).json({
    message: 'Lấy chi tiết người dùng thành công',
    data: { user },
  });
});

const toggleUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }

  const newStatus = user.status === 'active' ? 'locked' : 'active';

  user.status = newStatus;
  await user.save();

  res.status(httpStatus.OK).json({
    message: `${newStatus === 'locked' ? 'Khoá' : 'Mở khoá'} tài khoản thành công`,
    data: {
      user,
    },
  });
});

module.exports = {
  updateNotification,
  updateProfile,
  changePassword,
  getAllUsers,
  getUserDetail,
  toggleUserStatus,
};
