const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const Vocabulary = require('../models/vocabulary.model');
const ApiError = require('../utils/ApiError');
const VocabularyDaily = require('../models/vocabularyDaily.model');
const Flashcard = require('../models/flashcard.model');

const getAllvocabulary = catchAsync(async (req, res) => {
  const { pageSize = 12, page = 1, topicId, level, search = '' } = req.query;

  const skip = (+page - 1) * +pageSize;

  const filter = {};

  if (topicId) {
    filter.topicId = topicId;
  }

  if (level) {
    filter.level = Number(level);
  }

  if (search) {
    filter.$or = [
      { meaning: { $regex: search, $options: 'i' } },
      { hanzi: { $regex: search, $options: 'i' } },
      { pinyin: { $regex: search, $options: 'i' } },
    ];
  }
  const vocabularies = await Vocabulary.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(+pageSize)
    .select('-__v -createdAt -updatedAt')
    .populate({
      path: 'topicId',
      select: 'name',
    });

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

const createVocabulary = catchAsync(async (req, res) => {
  const { hanzi, pinyin, meaning, example, exampleMeaning, level, strokeCount, radical, audio, topicId } = req.body;

  const exist = await Vocabulary.findOne({ hanzi, topicId });
  if (exist) {
    throw new ApiError(400, 'Từ vựng đã tồn tại trong chủ đề này');
  }

  const vocab = await Vocabulary.create({
    hanzi,
    pinyin,
    meaning,
    example,
    exampleMeaning,
    level,
    strokeCount,
    radical,
    audio,
    topicId,
  });

  res.status(201).json({
    code: 201,
    message: 'Thêm từ vựng thành công',
    data: vocab,
  });
});

const updateVocabulary = catchAsync(async (req, res) => {
  const { id } = req.params;

  const vocab = await Vocabulary.findById(id);
  if (!vocab) {
    throw new ApiError(404, 'Không tìm thấy từ vựng');
  }

  Object.assign(vocab, req.body);

  await vocab.save();

  res.status(200).json({
    code: 200,
    message: 'Cập nhật từ vựng thành công',
    data: vocab,
  });
});

const deleteVocabulary = catchAsync(async (req, res) => {
  const { id } = req.params;

  const vocab = await Vocabulary.findById(id);
  if (!vocab) {
    throw new ApiError(404, 'Không tìm thấy từ vựng');
  }

  await vocab.deleteOne();

  res.status(200).json({
    code: 200,
    message: 'Xoá từ vựng thành công',
  });
});

const addVocabularyToFlashcard = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { deckId, vocabularyId } = req.body;

  if (!deckId || !vocabularyId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Thiếu dữ liệu');
  }

  const exist = await Flashcard.findOne({
    userId,
    deckId,
    vocabularyId,
  });

  if (exist) {
    return res.status(200).json({
      code: 200,
      message: 'Từ vựng đã có trong flashcard',
      data: exist,
    });
  }

  const flashcard = await Flashcard.create({
    userId,
    deckId,
    vocabularyId,
    status: 'new',
  });

  res.status(201).json({
    code: 201,
    message: 'Thêm vào flashcard thành công',
    data: flashcard,
  });
});

module.exports = {
  getAllvocabulary,
  getDailyVocabulary,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
  addVocabularyToFlashcard,
};
