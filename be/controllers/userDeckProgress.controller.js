const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const UserDeckProgress = require('../models/userDeckProgress.model');

const studyDeck = catchAsync(async (req, res) => {
  const { deckId } = req.body;
  const userId = req.user._id;

  let progress = await UserDeckProgress.findOne({ userId, deckId });

  if (!progress) {
    progress = await UserDeckProgress.create({
      userId,
      deckId,
      lastStudied: new Date(),
      completed: 0,
    });
  } else {
    progress.lastStudied = new Date();
    await progress.save();
  }

  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Cập nhật thời gian học thành công',
    data: progress,
  });
});

module.exports = {
  studyDeck,
};
