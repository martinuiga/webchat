const config = {
    app: {
        port: process.env.PORT || 3005,
        pipedriveAPIkey: 'b5b9bdc0ef52a3dce01d814544a9264c9328e088'
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
