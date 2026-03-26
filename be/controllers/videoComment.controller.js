const catchAsync = require('../utils/catchAsync');
const VideoComment = require('../models/videoComment.model');
const { status: httpStatus } = require('http-status');
const { getIO } = require('../config/socket');

const createComment = catchAsync(async (req, res) => {
  const { videoId, content } = req.body;
  const userId = req.user._id;

  const comment = await VideoComment.create({
    videoId,
    userId,
    content,
  });

  const populated = await comment.populate('userId', 'fullName avatar');

  const io = getIO();
  io.to(videoId).emit('new_comment', populated);

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Gửi comment thành công',
    data: populated,
  });
});

const getCommentsByVideo = catchAsync(async (req, res) => {
  const { videoId } = req.params;

  const comments = await VideoComment.find({ videoId }).populate('userId', 'fullName avatar').sort({ createdAt: -1 });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách comment thành công',
    data: comments,
  });
});

module.exports = {
  createComment,
  getCommentsByVideo,
};
