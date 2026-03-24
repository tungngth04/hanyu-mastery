const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    type: {
      type: String,
      enum: ['youtube', 's3'],
      required: true,
    },

    // YouTube
    videoId: String,

    // S3
    videoUrl: String,

    thumbnail: String,

    duration: Number,

    level: Number,

    views: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Video = mongoose.model('Video', videoSchema, 'videos');

module.exports = Video;
