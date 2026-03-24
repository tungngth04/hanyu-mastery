const axios = require('axios');
const getYoutubeInfo = async (videoId) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const item = response.data.items[0];

    if (!item) return null;

    return {
      author: item.snippet.channelTitle,
      views: Number(item.statistics.viewCount),
      publishedAt: item.snippet.publishedAt,
    };
  } catch (err) {
    console.error('Lỗi YouTube API:', err.message);
    return null;
  }
};

module.exports = { getYoutubeInfo };
