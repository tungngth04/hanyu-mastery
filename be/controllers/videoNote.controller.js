const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const VideoNote = require('../models/videoNote.model');

/**
 * Tạo note
 */
const createNote = catchAsync(async (req, res) => {
  const note = await VideoNote.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(httpStatus.CREATED).json({
    code: 201,
    message: 'Tạo note thành công',
    data: note,
  });
});

/**
 * Lấy danh sách note
 */
const getNotes = catchAsync(async (req, res) => {
  const notes = await VideoNote.find({
    videoId: req.params.videoId,
    userId: req.user._id,
  }).sort({ time: 1 });

  res.status(200).json({
    code: 200,
    message: 'Lấy danh sách note thành công',
    data: notes,
  });
});

/**
 * Xóa note
 */
const deleteNote = catchAsync(async (req, res) => {
  await VideoNote.findByIdAndDelete(req.params.id);

  res.status(200).json({
    code: 200,
    message: 'Xóa note thành công',
  });
});

module.exports = { createNote, getNotes, deleteNote };
