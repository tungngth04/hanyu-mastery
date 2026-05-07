const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');

const Video = require('../models/video.model');
const VideoNote = require('../models/videoNote.model');
const VideoProgress = require('../models/videoProgress.model');

const { getYoutubeId } = require('../helpers/getYoutubeId');
const { getYoutubeInfo } = require('../helpers/getYoutubeInfo');
const SavedVideo = require('../models/videoSave.model');
const ApiError = require('../utils/ApiError');

const createYoutubeVideo = catchAsync(async (req, res) => {
  const { title, url, level, description } = req.body;

  const videoId = getYoutubeId(url);

  if (!videoId) {
    return res.status(400).json({
      code: 400,
      message: 'Link YouTube không hợp lệ',
    });
  }

  const video = await Video.create({
    title,
    description,
    type: 'youtube',
    videoId,
    level,
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    createdBy: req.user._id,
  });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Tạo video YouTube thành công',
    data: video,
  });
});

// S3
const createS3Video = catchAsync(async (req, res) => {
  const { title, level, description } = req.body;

  if (!req.file) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      code: httpStatus.UNAUTHORIZED,
      message: 'Chưa upload video',
    });
  }

  const video = await Video.create({
    title,
    description,
    type: 's3',
    videoUrl: req.file.location,
    thumbnail: req.body.thumbnail || '',
    level,
    createdBy: req.user._id,
  });

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Upload video thành công',
    data: video,
  });
});

const getAllVideos = catchAsync(async (req, res) => {
  const { pageSize = 10, page = 1, search = '', level } = req.query;
  const skip = (+page - 1) * +pageSize;

  const filter = {
    ...(level && { level: Number(level) }),
    ...(search && { title: { $regex: search, $options: 'i' } }),
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
    message: 'Lấy danh sách video thành công',
    data: {
      videos: videosWithInfo,
      pageSize: +pageSize,
      currentPage: +page,
      totalPage: Math.ceil(total / +pageSize),
      totalResults: total,
    },
  });
});

const getVideoDetail = catchAsync(async (req, res) => {
  const { id } = req.params;

  let video = await Video.findById(id).populate('createdBy', 'name').lean();

  if (!video) {
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND,
      message: 'Không tìm thấy video',
    });
  }

  // Tăng view nếu video type S3, YouTube thì lấy từ API
  if (video.type === 's3') {
    await Video.findByIdAndUpdate(id, { $inc: { views: 1 } });
    video.views += 1;
    video.author = video.createdBy?.name || 'Ẩn danh';
  } else if (video.type === 'youtube') {
    const ytInfo = await getYoutubeInfo(video.videoId);
    video.author = ytInfo?.author || 'Ẩn danh';
    video.views = ytInfo?.views || 0;
    video.publishedAt = ytInfo?.publishedAt;
  }

  const notes = await VideoNote.find({
    videoId: id,
    userId: req.user._id,
  }).sort({ time: 1 });

  const progress = await VideoProgress.findOne({
    videoId: id,
    userId: req.user._id,
  });

  const isSaved = await SavedVideo.findOne({
    videoId: id,
    userId: req.user._id,
  });

  res.status(200).json({
    code: 200,
    message: 'Lấy video thành công',
    data: {
      video,
      notes,
      progress,
      isSaved: !!isSaved,
    },
  });
});


const deleteVideo = catchAsync(async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Xóa video thành công',
  });
});

const updateVideo = catchAsync(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  if (!video) {
    throw new ApiError(404, 'Không tìm thấy video');
  }

  const { title, description, level, url, thumbnail } = req.body;

  // update basic
  if (title !== undefined) video.title = title;
  if (description !== undefined) video.description = description;
  if (level !== undefined) video.level = level;
  if (thumbnail !== undefined) video.thumbnail = thumbnail;

  // nếu là youtube và có url mới
  if (video.type === 'youtube' && url) {
    const videoId = getYoutubeId(url);
    if (!videoId) {
      throw new ApiError(400, 'Link YouTube không hợp lệ');
    }

    video.videoId = videoId;
    video.thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  await video.save();

  res.status(200).json({
    code: 200,
    message: 'Cập nhật video thành công',
    data: video,
  });
});

module.exports = {
  createYoutubeVideo,
  createS3Video,
  getAllVideos,
  getVideoDetail,
  deleteVideo,
  updateVideo
};
