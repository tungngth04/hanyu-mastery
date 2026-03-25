const { getYoutubeInfo } = require('../helpers/getYoutubeInfo');
const Video = require('../models/video.model');
const SavedVideo = require('../models/videoSave.model');
const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');

const saveVideo = catchAsync(async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user._id;

  const exist = await SavedVideo.findOne({ userId, videoId });

  if (exist) {
    await SavedVideo.deleteOne({ _id: exist._id });

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'Bỏ lưu video thành công',
      data: { saved: false },
    });
  }

  await SavedVideo.create({ userId, videoId });

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Lưu video thành công',
    data: { saved: true },
  });
});

const getAllSaveVideos = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { pageSize = 10, page = 1, level } = req.query;
  const skip = (+page - 1) * +pageSize;

  const saved = await SavedVideo.find({ userId }).select('videoId');

  const savedVideoIds = saved.map((item) => item.videoId);

  const filter = {
    _id: { $in: savedVideoIds },
    ...(level && { level: Number(level) }),
  };

  const videos = await Video.find(filter)
    .sort({ createdAt: -1 })
    .populate('createdBy', 'name')
    .skip(skip)
    .limit(+pageSize)
    .lean();

  // Lấy info YouTube cho video type youtube
  const videosWithInfo = await Promise.all(
    videos.map(async (v) => {
      if (v.type === 'youtube') {
        const ytInfo = await getYoutubeInfo(v.videoId);
        return {
          ...v,
          author: ytInfo?.author || 'Ẩn danh',
          views: ytInfo?.views || v.views || 0,
        };
      } else {
        return {
          ...v,
          author: v.createdBy?.name || 'Ẩn danh',
        };
      }
    }),
  );

  const total = await Video.countDocuments(filter);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Lấy danh sách video đã lưu thành công',
    data: {
      videos: videosWithInfo,
      pageSize: +pageSize,
      currentPage: +page,
      totalPage: Math.ceil(total / +pageSize),
      totalResults: total,
    },
  });
});

module.exports = { saveVideo, getAllSaveVideos };
