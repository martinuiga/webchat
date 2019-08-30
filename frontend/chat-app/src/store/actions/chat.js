import { SEND_MESSAGE, TYPING } from './actionTypes';

export const sendMessage = (message, nickname, userId) => {
    return {
        type: SEND_MESSAGE,
        data: {
            message,
            nickname,
            userId
        }
    }
};

export const isTyping = (nickname, userId, typing) => {
    return {
        type: TYPING,
        data: {
            nickname,
            userId,
            typing
        }
    }
};
 