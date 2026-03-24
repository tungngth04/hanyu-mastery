const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const VideoProgress = require('../models/videoProgress.model');

/**
 * Lưu tiến độ video
 */
const saveProgress = catchAsync(async (req, res) => {
  const { videoId, currentTime, duration } = req.body;

  const progress = await VideoProgress.findOneAndUpdate(
    {
      userId: req.user._id,
      videoId,
    },
    {
      currentTime,
      duration,
      isCompleted: currentTime >= duration * 0.9,
    },
    {
      new: true,
      upsert: true,
    },
  );

  res.status(httpStatus.OK).json({
    code: 200,
    message: 'Lưu tiến độ thành công',
    data: progress,
  });
});

/**
 * Lấy tiến độ
 */
const getProgress = catchAsync(async (req, res) => {
  const progress = await VideoProgress.findOne({
    userId: req.user._id,
    videoId: req.params.videoId,
  });

  res.status(200).json({
    code: 200,
    message: 'Lấy tiến độ thành công',
    data: progress,
  });
});

module.exports = { saveProgress, getProgress };
