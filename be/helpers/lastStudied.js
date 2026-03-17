const formatLastStudied = (date) => {
  if (!date) return 'Chưa học';

  const now = new Date();
  const diffDays = Math.floor((now - new Date(date)) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return '1 ngày trước';
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return `${Math.floor(diffDays / 7)} tuần trước`;
};

module.exports = { formatLastStudied };
