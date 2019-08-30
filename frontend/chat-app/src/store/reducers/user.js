import * as actionTypes from "../../../../../../webchat/frontend/chat-app/src/store/actions/actionTypes";
import { updateObject } from "../../shared/utility";

const userInitialState = {
    nickname: "",
	userId: null
};

const setNickname = (state, action) => {
    return updateObject(state, {
        nickname: action.data.nickname
    });
};

const setUserId = (state, action) => {
	return updateObject(state, {
		userId: action.data.id
	})
};

export default (state = userInitialState, action) => {
    switch (action.type) {
		case actionTypes.SET_NICKNAME:
            return setNickname(state, action);
		case actionTypes.INITIALIZE_ROOMS:
			return setUserId(state, action);
        default:
            return state
    }
}
