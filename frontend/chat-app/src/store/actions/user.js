import * as actionTypes from "./actionTypes";

export const setNickname = (nickname) => {
    return {
		type: actionTypes.SET_NICKNAME,
        data: {
            nickname
        }
    }
};
