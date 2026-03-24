const mongoose = require('mongoose');

const videoNoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
    time: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const VideoNote = mongoose.model('VideoNote', videoNoteSchema, 'video_notes');

module.exports = VideoNote;
