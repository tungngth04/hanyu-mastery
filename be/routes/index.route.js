const express = require('express');

const apiRoute = express.Router();

const listRoutesApi = [
  {
    path: '/auth',
    route: require('./auth.route'),
  },
  {
    path: '/vocabulary-topic',
    route: require('./vocabulary_topic.route'),
  },
  {
    path: '/vocabulary',
    route: require('./vocabulary.route'),
  },
  {
    path: '/flashcard-deck',
    route: require('./flashcard_deck.route'),
  },
  {
    path: '/user-deck-progress',
    route: require('./user_deck_progress.route'),
  },
  { path: '/flashcard', route: require('./flashcard.route') },
];

listRoutesApi.forEach((route) => {
  apiRoute.use(route.path, route.route);
});

module.exports = apiRoute;
