const mongoose = require('mongoose');

const videoCommentSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: String,
  },
  { timestamps: true },
);

const VideoComment = mongoose.model('VideoComment', videoCommentSchema, 'video_comment');

module.exports = VideoComment;
