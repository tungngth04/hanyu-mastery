const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const VideoNote = require('../models/videoNote.model');

const createNote = catchAsync(async (req, res) => {
  const { videoId, time, content } = req.body;

  const note = await VideoNote.create({
    userId: req.user._id,
    videoId,
    time,
    content,
  });

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo note thành công',
    data: note,
  });
});

const getNotes = catchAsync(async (req, res) => {
  const notes = await VideoNote.find({
    videoId: req.params.videoId,
    userId: req.user._id,
  }).sort({ time: 1 });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách note thành công',
    data: notes,
  });
});

const deleteNote = catchAsync(async (req, res) => {
  await VideoNote.findByIdAndDelete(req.params.id);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xóa note thành công',
  });
});

module.exports = { createNote, getNotes, deleteNote };
