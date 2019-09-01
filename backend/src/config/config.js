const config = {
    app: {
        port: process.env.PORT || 3005,
        pipedriveAPIkey: ''
    }
};

const chatLog = {
    roomId: 0,
    log: [],
    dealNumber: 0
};

const chatRoom = {
    id: 0,
    name: 'chatroom',
    connectedUsers: [],
};

const users = [
];

module.exports = {
    chatRoom,
    chatLog,
    users,
    config
};
