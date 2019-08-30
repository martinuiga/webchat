import _ from "lodash";

class ChatLogController {

  updateChatLog = (chatRoom, users, io, nickname, chatLog, message) => {
    const user = _.find(users, {nickname: nickname});
    const room = chatRoom;
    const chatlog = chatLog.log;
    const newId = (chatlog.length > 0 ? _.last(chatlog).id + 1 : 0);
    const newMessage = {
      id: newId,
      owner: user.id,
      message: message,
      date: new Date()
    };
    this.pushLog(chatlog, newMessage);
    this.updateChatLogSingle(room.name, io, newMessage);
  };

  updateChatLogSingle = (roomName, io, message) => {
    io.to(roomName).emit('action', {
      type: 'UPDATE_LOG_SINGLE',
      data: {
        message: message
      }
    });
  };

  updateChatLogFull = (roomName, io, chatLog) => {
    io.to(roomName).emit('action', {
      type: 'UPDATE_LOG_FULL',
      data: {
        chatLog: chatLog
      }
    });
  };

  pushLog = (arr, elem) => {
    if (arr.length >= 100) {
      arr.shift();
    }
    arr.push(elem);
  };
}

module.exports = new ChatLogController();
