const joi = require('joi');

const getAllTopic = {
  query: joi.object({}),
};

module.exports = { getAllTopic };
