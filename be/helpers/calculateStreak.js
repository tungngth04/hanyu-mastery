const dayjs = require('dayjs');

const calculateStreak = (progressDocs) => {
  const days = progressDocs
    .map((item) => item.lastStudied)
    .filter(Boolean)
    .map((date) => dayjs(date).startOf('day').format())
    .sort((a, b) => dayjs(b).diff(dayjs(a)));

  if (days.length === 0) return 0;

  let streak = 1;

  for (let i = 1; i < days.length; i++) {
    const diff = dayjs(days[i - 1]).diff(dayjs(days[i]), 'day');

    if (diff === 1) {
      streak++;
    } else if (diff > 1) {
      break;
    }
  }

  return streak;
};

module.exports = { calculateStreak };
