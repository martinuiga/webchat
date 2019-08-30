import { createStore, combineReducers, applyMiddleware } from "redux";
import io from "socket.io-client";
import createSocketIoMiddleware from "redux-socket.io";

import socketReducer from "./reducers/socket";
import userReducer from "./reducers/user";
import * as actionTypes from "./actions/actionTypes";

let socket = io("localhost:3005");
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const rootReducer = combineReducers({
    socket: socketReducer,
    user: userReducer
});


const store = createStore(
    rootReducer,
    applyMiddleware(socketIoMiddleware)
);

socket.on("connect", () => {
    if (store.getState().socket.connection !== 1) {
        store.dispatch({
            type: actionTypes.CONN_STATUS,
            status: 1
        });
    }
});

socket.on("disconnect", () => {
    if (store.getState().socket.connection !== 0) {
        store.dispatch({
            type: actionTypes.CONN_STATUS,
            status: 0
        });
    }
});

export default store;
