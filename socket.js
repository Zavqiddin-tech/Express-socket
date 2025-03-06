let io;

const initSocket = (httpServer) => {
  const { Server } = require('socket.io');
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);                                      
    });
  });

  return io;
};

const getSocketInstance = () => {
  if (!io) {
    throw new Error('Socket.IO is not initialized');
  }
  return io;
};

module.exports = { initSocket, getSocketInstance };