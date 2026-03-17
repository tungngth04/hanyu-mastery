const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const Vocabulary = require('../models/vocabulary.model');
const ApiError = require('../utils/ApiError');

const getAllvocabulary = catchAsync(async (req, res) => {
  const { pageSize = 10, page = 1 } = req.query;
  const skip = (+page - 1) * +pageSize;

  const vocabularys = await Vocabulary.find()
    .sort({ level: 1 })
    .skip(skip)
    .limit(+pageSize)
    .select('-__v -createdAt -updatedAt -topicId');

  const totalResults = await Vocabulary.countDocuments();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách từ vựng thành công',
    data: {
      vocabularys,
      limit: +pageSize,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +pageSize),
      totalResults,
    },
  });
});

const getVocabularyByTopicId = catchAsync(async (req, res) => {
  const { pageSize = 10, page = 1 } = req.query;
  const skip = (+page - 1) * +pageSize;

  const { topicId } = req.params;

  const vocabularies = await Vocabulary.find({ topicId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(+pageSize)
    .select('-__v -createdAt -updatedAt');

  if (vocabularies.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy từ vựng!');
  }

  const totalResults = await Vocabulary.countDocuments({ topicId });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách từ vựng theo topic thành công',
    data: {
      vocabularies,
      limit: +pageSize,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +pageSize),
      totalResults,
    },
  });
});

module.exports = { getAllvocabulary, getVocabularyByTopicId };
