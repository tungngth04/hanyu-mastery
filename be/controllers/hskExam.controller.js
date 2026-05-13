const HSKExam = require('../models/hskExam.model');
const catchAsync = require('../utils/catchAsync');

const createExam = catchAsync(async (req, res) => {
  const exam = await HSKExam.create(req.body);

  res.status(201).json({
    message: 'Tạo đề thi thành công',
    data: exam,
  });
});

const getAllExams = catchAsync(async (req, res) => {
  const { pageSize = 10, page = 1, search = '', level } = req.query;

  const skip = (+page - 1) * +pageSize;

  // ===== FILTER =====
  const filter = {
    deleted: false,
    ...(level && { level: Number(level) }),
    ...(search && {
      title: { $regex: search, $options: 'i' },
    }),
  };

  // ===== QUERY =====
  const exams = await HSKExam.find(filter).sort({ createdAt: -1 }).skip(skip).limit(+pageSize).lean();

  // ===== COUNT =====
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

module.exports = {
  createExam,
  getAllExams,
  getExamDetail,
};
