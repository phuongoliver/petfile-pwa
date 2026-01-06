require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const app = require('./src/app');
const socketService = require('./src/services/socketService');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketIo(server);

// Initialize Socket.io Logic
socketService(io);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});