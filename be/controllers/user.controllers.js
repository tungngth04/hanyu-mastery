const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { status: httpStatus } = require('http-status');
const cloudinary = require('../config/cloudinary');
const Vocabulary = require('../models/vocabulary.model');
const Video = require('../models/video.model');
const { calculateStreak } = require('../helpers/calculateStreak');
const UserGrammarProgress = require('../models/userGrammarProgress.model');
const User_Deck_Progress = require('../models/userDeckProgress.model');

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
  const { page = 1, limit = 10, search = '' } = req.query;

  const skip = (+page - 1) * +limit;

  const filter = {
    deleted: false,
  };

  if (search) {
    filter.$or = [{ fullName: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  }

  const [users, total] = await Promise.all([
    User.find(filter).select('-password').skip(skip).limit(+limit).sort({ createdAt: 1 }),

    User.countDocuments(filter),
  ]);

  res.status(httpStatus.OK).json({
    message: 'Lấy danh sách người dùng thành công',
    data: {
      users,
      total,
      page: +page,
      limit: +limit,
    },
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

const getDashboardOverview = catchAsync(async (req, res) => {
  const [totalUsers, totalVocabulary, totalVideos, totalExams] = await Promise.all([
    User.countDocuments({ deleted: false }),
    Vocabulary.countDocuments(),
    Video.countDocuments(),
    // Exam.countDocuments(),
  ]);

  res.status(200).json({
    message: 'Lấy tổng quan thành công',
    data: {
      totalUsers,
      totalVocabulary,
      totalVideos,
      // totalExams,
    },
  });
});

const getUserGrowth = catchAsync(async (req, res) => {
  const days = 7;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const data = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
        deleted: false,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json({
    message: 'Lấy biểu đồ thành công',
    data,
  });
});

function formatStudyTime(minutes = 0) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

const getLearningStats = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const progressList = await UserGrammarProgress.find({ userId }).lean();

  const completedLessons = progressList.filter((p) => p.isCompleted).length;

  const totalStudyMinutes = completedLessons * 12;

  const studyTime = formatStudyTime(totalStudyMinutes);

  res.status(httpStatus.OK).json({
    code: 200,
    message: 'Lấy thống kê học tập thành công',
    data: {
      studyTime,
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
  getDashboardOverview,
  getUserGrowth,
  getLearningStats,
};
