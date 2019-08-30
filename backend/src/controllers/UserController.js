import _ from 'lodash';

class UserController {

    userDisconnected = (users, socket) => {
        let userWhoDisconnected = null;
        _.forEach(users, (user) => {
            if (user.socketId !== socket.id) return;
            user.connected = false;
            userWhoDisconnected = user;
            return false;
        });
        return userWhoDisconnected;
    };


    userReconnected = (users, socket, nickname) => {
        let foundUser = {};
        _.forEach(users, (user) => {
            if (user.nickname === nickname) {
                user.connected = true;
                user.socketId = socket.id;
                foundUser = user;
            }
        });
        return foundUser;
    }
}

module.exports = new UserController();
