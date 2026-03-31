const express = require('express');

const apiRoute = express.Router();

const listRoutesApi = [
  {
    path: '/auth',
    route: require('./auth.route'),
  },
  {
    path: '/vocabulary-topic',
    route: require('./vocabularyTopic.route'),
  },
  {
    path: '/vocabulary',
    route: require('./vocabulary.route'),
  },
  {
    path: '/flashcard-deck',
    route: require('./flashcardDeck.route'),
  },
  {
    path: '/user-deck-progress',
    route: require('./userDeckProgress.route'),
  },
  { path: '/flashcard', route: require('./flashcard.route') },
  { path: '/users', route: require('./user.route') },
  { path: '/supports', route: require('./support.routes') },
  {
    path: '/videos',
    route: require('./video.route'),
  },
  {
    path: '/video-progress',
    route: require('./videoProgress.route'),
  },
  {
    path: '/video-note',
    route: require('./videoNote.route'),
  },
  { path: '/video-save', route: require('./videoSave.route') },
  {
    path: '/video-comment',
    route: require('./videoComment.route'),
  },
  {
    path: '/pronunciation',
    route: require('./pronunciation.route'),
  },
  {
    path: '/pinyin',
    route: require('./pinyin.route'),
  },
];

listRoutesApi.forEach((route) => {
  apiRoute.use(route.path, route.route);
});

module.exports = apiRoute;
