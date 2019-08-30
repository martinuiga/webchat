const config = {
  app: {
    port: process.env.PORT || 3005,
  }
};

const chatLog = {
  roomId: 0,
  log: []
};

const chatRoom = {
  id: 0,
  name: 'chatroom',
  connectedUsers: [],
};

const users = [
    {
        id: 0,
        socketId: 'asdasd',
        nickname: 'Jüri',
        connected: true,
        apiId: 'asdasdasdsad'
    }
];

module.exports = {
  chatRoom,
  chatLog,
  users,
  config
};
