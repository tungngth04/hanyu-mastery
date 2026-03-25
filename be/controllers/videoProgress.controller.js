const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const VideoProgress = require('../models/videoProgress.model');

const saveProgress = catchAsync(async (req, res) => {
  const { videoId, currentTime } = req.body;

  let progress = await VideoProgress.findOne({
    userId: req.user._id,
    videoId,
  });

  if (progress) {
    progress.currentTime = currentTime;
    await progress.save();
  } else {
    progress = await VideoProgress.create({
      userId: req.user._id,
      videoId,
      currentTime,
    });
  }

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Lưu progress thành công',
    data: progress,
  });
});

const getProgress = catchAsync(async (req, res) => {
  const progress = await VideoProgress.findOne({
    userId: req.user._id,
    videoId: req.params.videoId,
  });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy tiến độ thành công',
    data: progress,
  });
});

module.exports = { saveProgress, getProgress };
