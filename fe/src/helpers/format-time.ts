export const formatTimeAgo = (dateString?: string) => {
  if (!dateString) return "";

  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const weeks = Math.floor(diff / 604800);
  const months = Math.floor(diff / 2592000);
  const years = Math.floor(diff / 31536000);

  if (years > 0) return `${years} năm trước`;
  if (months > 0) return `${months} tháng trước`;
  if (weeks > 0) return `${weeks} tuần trước`;
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;

  return "Vừa xong";
};
