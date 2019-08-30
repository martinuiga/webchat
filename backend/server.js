import 'dotenv/config';
import config from "./src/config/config";
import { createServer } from 'http';
import SocketController from "./src/controllers/SocketController";


const port = config.config.app.port;
const server = createServer().listen(port);
const socketIO = require("socket.io");
const io = socketIO(server);


let socketController;
let chatRoom = config.chatRoom;
let chatLog = config.chatLog;
const users = config.users;

io.on('connection', (socket) => {
    socketController = new SocketController(socket, io, chatRoom, chatLog, users);
    socketController.handleEvents();
});
console.log(`Server started on port ${port}`);