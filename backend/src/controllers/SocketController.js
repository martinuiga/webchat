import socketActions from '../config/actions';

class SocketController {
    constructor(socket, io, chatRoom, chatLog, users) {
        this.socket = socket;
        this.io = io;
        this.chatRooms = chatRoom;
        this.chatLog = chatLog;
        this.users = users;
    }

    handleEvents = () => {
        this.socket.on('action', (action) => {
            console.log(action);
            switch (action.type) {
                case socketActions.INITIALIZE:
                    return this.actionInitialize(action, this.socket.id);
                default:
                    return console.log('Unknown action ', action.type);
            }
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected');
        });
        this.socket.on('reconnect', (action) => {
            this.actionInitialize(action, this.socket.id);
        })
    };

    actionInitialize = (action, id) => {
        // Initializing action
    };
}

module.exports = SocketController;
