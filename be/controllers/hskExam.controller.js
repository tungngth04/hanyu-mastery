const HSKExam = require('../models/hskExam.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getAllExams = catchAsync(async (req, res) => {
  const { pageSize = 10, page = 1, search = '', level } = req.query;

  const skip = (+page - 1) * +pageSize;

  const filter = {
    deleted: false,
    ...(level && { level: Number(level) }),
    ...(search && {
      title: { $regex: search, $options: 'i' },
    }),
  };

  const exams = await HSKExam.find(filter).sort({ createdAt: -1 }).skip(skip).limit(+pageSize).lean();

  const total = await HSKExam.countDocuments(filter);

  res.status(200).json({
    code: 200,
    message: 'Lấy danh sách đề thi thành công',
    data: {
      exams,
      pageSize: +pageSize,
      currentPage: +page,
      totalPage: Math.ceil(total / +pageSize),
      totalResults: total,
    },
  });
});

const getExamDetail = catchAsync(async (req, res) => {
  const exam = await HSKExam.findById(req.params.id);

  res.json({
    data: exam,
  });
});

// CREATE (admin)
const createExam = catchAsync(async (req, res) => {
  const exam = await HSKExam.create(req.body);

  res.status(201).json({
    code: 201,
    message: 'Tạo đề thi thành công',
    data: exam,
  });
});

const updateExam = catchAsync(async (req, res) => {
  const exam = await HSKExam.findById(req.params.id);

  if (!exam) {
    throw new ApiError(404, 'Không tìm thấy đề thi');
  }

  Object.assign(exam, req.body);
  await exam.save();

  res.json({
    code: 200,
    message: 'Cập nhật đề thi thành công',
    data: exam,
  });
});

const deleteExam = catchAsync(async (req, res) => {
  const exam = await HSKExam.findById(req.params.id);

  if (!exam) {
    throw new ApiError(404, 'Không tìm thấy đề thi');
  }

  exam.deleted = true;
  await exam.save();

  res.json({
    code: 200,
    message: 'Xoá đề thi thành công',
  });
});

module.exports = {
  createExam,
  getAllExams,
  getExamDetail,
  updateExam,
  deleteExam,
};
