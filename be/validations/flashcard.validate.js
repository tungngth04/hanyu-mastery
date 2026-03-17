const joi = require('joi');
const { objectId } = require('./custom.validation');

const getFlashcardByDeckId = {
  params: joi.object().keys({
    deckId: joi.string().required().custom(objectId),
  }),
};

module.exports = {
  getFlashcardByDeckId,
};
