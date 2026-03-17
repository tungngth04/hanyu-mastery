const catchAsync = require('../utils/catchAsync');
const VocabularyTopic = require('../models/vocabulary_topic.model');
const { status: httpStatus } = require('http-status');

const getAllTopic = catchAsync(async (req, res) => {
  const Topic = await VocabularyTopic.find().select('-__v -createdAt -updatedAt');

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy dữ liệu thành công',
    data: {
      Topic,
    },
  });
});

module.exports = { getAllTopic };
