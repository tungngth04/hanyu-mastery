const { status: httpStatus } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Support = require('../models/support.model');

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

/**
 * Lấy tất cả yêu cầu hỗ trợ (dành cho admin)
 */
const getAllSupportRequests = catchAsync(async (req, res) => {
  const requests = await Support.find().sort({ createdAt: -1 });

  res.status(httpStatus.OK).json({
    message: 'Danh sách yêu cầu hỗ trợ',
    data: requests,
  });
});

module.exports = {
  createSupportRequest,
  getAllSupportRequests,
};
