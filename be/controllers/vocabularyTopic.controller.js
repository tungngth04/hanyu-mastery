const catchAsync = require('../utils/catchAsync');
const VocabularyTopic = require('../models/vocabularyTopic.model');
const { status: httpStatus } = require('http-status');

const getAllTopic = catchAsync(async (req, res) => {
  const data = await VocabularyTopic.find().select('-__v -createdAt -updatedAt');

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy dữ liệu thành công',
    data: {
      data,
    },
  });
});

module.exports = { getAllTopic };
