const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const Vocabulary = require('../models/vocabulary.model');
const ApiError = require('../utils/ApiError');
const VocabularyDaily = require('../models/vocabularyDaily.model');

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

const getDailyVocabulary = catchAsync(async (req, res) => {
  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  const daily = await VocabularyDaily.findOne({ date: today }).populate('vocabularies');

  if (!daily) {
    throw new ApiError(404, 'Chưa có từ vựng hôm nay');
  }

  res.json({
    code: 200,
    message: 'Lấy từ vựng hôm nay thành công',
    data: daily.vocabularies,
  });
});

module.exports = { getAllvocabulary, getDailyVocabulary };
