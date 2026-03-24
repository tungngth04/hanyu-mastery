const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');
const path = require('path');

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,

    contentType: multerS3.AUTO_CONTENT_TYPE,

    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      const fileName = `videos/${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

      cb(null, fileName);
    },
  }),

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/mkv', 'video/webm'];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Chỉ hỗ trợ file video'), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
