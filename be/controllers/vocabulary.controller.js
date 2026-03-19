const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const Vocabulary = require('../models/vocabulary.model');
const ApiError = require('../utils/ApiError');

const getAllvocabulary = catchAsync(async (req, res) => {
  const { pageSize = 10, page = 1, topicId } = req.query;

  const skip = (+page - 1) * +pageSize;

  const filter = topicId ? { topicId } : {};

  const vocabularies = await Vocabulary.find(filter)
    .sort({ level: 1 })
    .skip(skip)
    .limit(+pageSize)
    .select('-__v -createdAt -updatedAt');

  if (vocabularies.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy từ vựng!');
  }

  const totalResults = await Vocabulary.countDocuments(filter);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách từ vựng thành công',
    data: {
      vocabularies,
      limit: +pageSize,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +pageSize),
      totalResults,
    },
  });
});

module.exports = { getAllvocabulary };
