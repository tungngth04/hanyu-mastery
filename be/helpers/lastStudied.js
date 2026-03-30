const formatLastStudied = (date) => {
  if (!date) return 'Chưa học';

  const now = new Date();
  const studied = new Date(date);

  now.setHours(0, 0, 0, 0);
  studied.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((now - studied) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return `${Math.floor(diffDays / 7)} tuần trước`;
};

module.exports = { formatLastStudied };
