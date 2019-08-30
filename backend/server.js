import { createServer } from 'http';

const port = 3005;
const server = createServer().listen(port);
const socketIO = require("socket.io");
const io = socketIO(server);


io.on('connection', socket => {
    console.log('a user connected');
});

console.log(`Server started on port ${port}`);