const catchAsync = require('../utils/catchAsync');
const VocabularyTopic = require('../models/vocabularyTopic.model');
const { status: httpStatus } = require('http-status');
const ApiError = require('../utils/ApiError');

const getAllTopic = catchAsync(async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (+page - 1) * +pageSize;

  const [topics, total] = await Promise.all([
    VocabularyTopic.find()
      .select('-__v -createdAt -updatedAt')
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(pageSize)),

    VocabularyTopic.countDocuments(),
  ]);

  res.status(200).json({
    message: 'Lấy danh sách chủ đề thành công',
    data: {
      topics,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    },
  });
});

const createTopic = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  const exist = await VocabularyTopic.findOne({ name });
  if (exist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chủ đề đã tồn tại');
  }

  const topic = await VocabularyTopic.create({ name, description });

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Thêm chủ đề thành công',
    data: topic,
  });
});

const updateTopic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const topic = await VocabularyTopic.findById(id);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề');
  }

  topic.name = name ?? topic.name;
  topic.description = description ?? topic.description;

  await topic.save();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật chủ đề thành công',
    data: topic,
  });
});

const deleteTopic = catchAsync(async (req, res) => {
  const { id } = req.params;

  const topic = await VocabularyTopic.findById(id);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề');
  }

  await topic.deleteOne();

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xoá chủ đề thành công',
  });
});

const getTopicById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const topic = await VocabularyTopic.findById(id).select('-__v -createdAt -updatedAt');

  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chủ đề');
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy chi tiết chủ đề thành công',
    data: topic,
  });
});

module.exports = { getAllTopic, createTopic, updateTopic, deleteTopic, getTopicById };
