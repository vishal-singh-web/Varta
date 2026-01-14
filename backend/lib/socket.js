const {Server} = require('socket.io');
const http = require('http');
const express = require('express');
const socketAuthMiddleware = require('../middleware/socketAuthMiddleware');
const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:process.env.actionURL,
        credentials:true
    }
});

io.use(socketAuthMiddleware);


//for storing online users
const userSocketMap = {};

function getRecieverSocketId(userId){
    return userSocketMap[userId]
}
io.on("connection",(socket)=>{
    console.log(`${socket.user.username} connected to socket.`);
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;
    //used to send event to all connected users
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
    socket.on('disconnect',()=>{
        console.log(`${socket.user.username} disconnected to socket.`);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})
module.exports = {io,app,server,getRecieverSocketId};