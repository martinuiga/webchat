import * as actionTypes from "./actionTypes";

export const initialize = (nickname) => {
	return {
		type: actionTypes.INITIALIZE,
		data: {
			nickname
		}
	}
};

export const sendResponse = (message) => {
	return {
		type: actionTypes.SEND_TO_SERVER_EXAMPLE,
		data: {
			message
		}
	}
};
