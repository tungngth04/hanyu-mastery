let io;

// gán socket vào servet
const initSocket = (server) => {
  io = require('socket.io')(server, {
    cors: {
      // cho fe connect từ các domain khác dev ok, produc nên giới hạn
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_video', (videoId) => {
      socket.join(videoId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

const getIO = () => {
  if (!io) throw new Error('Socket not initialized');
  return io;
};

module.exports = { initSocket, getIO };
