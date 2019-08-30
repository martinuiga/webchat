import _ from 'lodash';

class ChatRoomController {

    updateRoom = (chatRoom, users, chatLog) => {
        chatRoom.connectedUsers.forEach(user => {
            const userInRoom = _.find(users, {id: user.id});

            if (userInRoom && userInRoom.connected) {
                return;
            }
            _.remove(chatRoom.connectedUsers, user);
        });
        // Reset the chatLog if everyone left
        if (chatRoom.connectedUsers.length === 0) {
            chatLog.log = [];
        }
        return chatRoom;
    };
}

module.exports = new ChatRoomController();
