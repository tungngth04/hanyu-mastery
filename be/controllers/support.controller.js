const { status: httpStatus } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Support = require('../models/support.model');
const ApiError = require('../utils/ApiError');

const createSupportRequest = catchAsync(async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  const supportRequest = await Support.create({
    fullName,
    email,
    subject,
    message,
  });

  res.status(httpStatus.CREATED).json({
    message: 'Gửi yêu cầu hỗ trợ thành công',
    data: supportRequest,
  });
});

const getAllSupportRequests = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const [supports, total] = await Promise.all([
    Support.find().sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit)),

    Support.countDocuments(),
  ]);

  res.status(200).json({
    message: 'Lấy danh sách yêu cầu hỗ trợ thành công',
    data: {
      supports,
      total,
      page: Number(page),
      limit: Number(limit),
    },
  });
});

const getSupportDetail = catchAsync(async (req, res) => {
  const { id } = req.params;

  const support = await Support.findById(id);

  if (!support) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy yêu cầu hỗ trợ');
  }

  res.status(httpStatus.OK).json({
    message: 'Lấy chi tiết yêu cầu hỗ trợ thành công',
    data: support,
  });
});

const updateSupportStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const support = await Support.findById(id);

  if (!support) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy yêu cầu hỗ trợ');
  }

  support.status = status;
  await support.save();

  res.status(httpStatus.OK).json({
    message: 'Cập nhật trạng thái thành công',
    data: support,
  });
});

module.exports = {
  createSupportRequest,
  getAllSupportRequests,
  getSupportDetail,
  updateSupportStatus,
};
