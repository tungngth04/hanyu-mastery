// cloudinary
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

module.exports.uploadSingle = (folderName) => {
  return async (req, res, next) => {
    try {
      if (!req.file) return next();

      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `${folderName}/${req.user._id}`,
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();

      // req.file.fieldname lấy ra cái name của cái input
      req.body[req.file.fieldname] = result.secure_url;
      req.body[`${req.file.fieldname}PublicId`] = result.public_id;

      next();
    } catch (err) {
      next(err);
    }
  };
};
