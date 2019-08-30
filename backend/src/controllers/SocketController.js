import _ from 'lodash';
import socketActions from '../config/actions';
import UserController from './UserController';
import ChatRoomController from './ChatRoomController';
import ChatLogController from './ChatLogController';

class SocketController {
    constructor(socket, io, chatRoom, chatLog, users) {
        this.socket = socket;
        this.io = io;
        this.chatRoom = chatRoom;
        this.chatLog = chatLog;
        this.users = users;
    }

    handleEvents = () => {
        this.socket.on('action', (action) => {
            console.log(action);
            switch (action.type) {
                case socketActions.INITIALIZE:
                    return this.actionInitialize(action, this.socket.id);
                case socketActions.SEND_MESSAGE:
                    return this.actionMessage(action);
                case socketActions.RECONNECT:
                    return this.actionInitialize(action, this.socket.id);
                case socketActions.TYPING:
                    return this.actionTyping(action);
                default:
                    return console.log('Unknown action ', action.type);
            }
        });

        this.socket.on('disconnect', () => {
            console.log("disconnected");
            UserController.userDisconnected(this.users, this.socket);
            this.updateRoomsAll(this.chatRoom, this.users, this.io, this.chatLog);
        });
        this.socket.on('reconnect', (action) => {
            this.actionInitialize(action, this.socket.id);
        });
    };

    actionInitialize = (action, id) => {
        const nickname = action.data.nickname;

        if (!action.data.nickname) {
            console.log('Nickname missing');
            return null;
        }
        const users = this.users;
        const activeSameUser = _.find(users, {nickname: nickname});
        let userId = users.length;

        if (activeSameUser) {
            if (activeSameUser.connected) {
                this.socket.emit('action', {
                    type: 'NEW_NAME_REQUIRED',
                    data: {
                        nickname
                    }
                });
                return null;
            } else {
                let reconnectedUser = UserController.userReconnected(this.users, this.socket, nickname);
                userId = reconnectedUser.id;
                this.chatRoom.connectedUsers.unshift({...reconnectedUser});
            }
        } else {
            const currentUser = {
                id: userId,
                nickname,
                socketId: id,
                connected: true
            };

            users.unshift({
                ...currentUser
            });
            this.chatRoom.connectedUsers.unshift({...currentUser});
        }

        this.socket.emit('action', {
            type: 'INITIALIZE_ROOMS',
            data: {
                id: userId,
                chatRoom: this.chatRoom,
                chatLog: this.chatLog,
                users: users,
                nickname: nickname
            }
        });

        this.updateRoomsOthers(this.chatRoom, this.users, this.socket, this.chatLog);
        this.socket.join(this.chatRoom.name);
        ChatLogController.updateChatLogFull(this.chatRoom.name, this.io, this.chatLog.log);
    };

    updateRoomsAll = (chatRoom, users, io, chatLog) => {
        ChatRoomController.updateRoom(chatRoom, users, chatLog);

        io.sockets.emit('action', {
            type: 'ROOM_UPDATE',
            data: {
                chatRoom: chatRoom,
                users: users
            }
        });
    };

    updateRoomsOthers = (chatRoom, users, socket, chatLog) => {
        ChatRoomController.updateRoom(chatRoom, users, chatLog);

        socket.broadcast.emit('action', {
            type: 'ROOM_UPDATE',
            data: {
                chatRoom: chatRoom,
                users: users
            }
        });
    };

    actionMessage = (action) => {
        if (action.data.message === "") {
            return this.sendError('Message missing', 'Error');
        }
        ChatLogController.updateChatLog(this.chatRoom, this.users, this.io,
            action.data.nickname, this.chatLog, action.data.message);
    };

    actionTyping = (action) => {
        this.socket.broadcast.emit('action', {
            type: 'USERS_UPDATE',
            data: {
                typingStatus: {
                    typingId: action.data.userId,
                    typing: action.data.typing
                }
            }
        });
    };
}

module.exports = SocketController;
