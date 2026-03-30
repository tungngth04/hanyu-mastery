const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const UserDeckProgress = require('../models/userDeckProgress.model');

const updateLastStudied = async (userId, deckId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const progress = await UserDeckProgress.findOne({
    userId,
    deckId,
  });

  if (!progress || !progress.lastStudied || progress.lastStudied < today) {
    await UserDeckProgress.findOneAndUpdate(
      {
        userId,
        deckId,
      },
      {
        lastStudied: new Date(),
      },
      {
        upsert: true,
        new: true,
      },
    );
  }
};

const studyDeck = catchAsync(async (req, res) => {
  const { deckId } = req.body;
  const userId = req.user._id;

  await updateLastStudied(userId, deckId);

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Bắt đầu học deck thành công',
  });
});

module.exports = {
  studyDeck,
  updateLastStudied,
};
