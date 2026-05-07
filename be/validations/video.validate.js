const joi = require('joi');
const { objectId } = require('./custom.validation');

const createYoutubeVideo = {
  body: joi.object({
    title: joi.string().trim().required(),
    url: joi.string().uri().required(),
    description: joi.string().allow('').optional(),
    level: joi.number().min(1).max(6).optional(),
  }),
};

const createS3Video = {
  body: joi.object({
    title: joi.string().trim().required(),
    description: joi.string().allow('').optional(),
    level: joi.number().min(1).max(6).optional(),
    thumbnail: joi.string().uri().allow('').optional(),
  }),
};

const updateVideo = {
  params: joi.object({
    id: joi.string().custom(objectId).required(),
  }),

  body: joi
    .object({
      title: joi.string().trim().optional(),
      description: joi.string().allow('').optional(),
      level: joi.number().min(1).max(6).optional(),
      url: joi.string().uri().optional(), // youtube only
      thumbnail: joi.string().uri().allow('').optional(),
    })
    .min(1),
};

const deleteVideo = {
  params: joi.object({
    id: joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createYoutubeVideo,
  createS3Video,
  updateVideo,
  deleteVideo,
};
