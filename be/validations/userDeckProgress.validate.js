const Joi = require('joi');

const studyDeck = {
  body: Joi.object().keys({
    deckId: Joi.string().required(),
  }),
};

module.exports = {
  studyDeck,
};
