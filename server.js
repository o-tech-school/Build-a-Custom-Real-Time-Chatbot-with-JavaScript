const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket)=>{
    
    socket.on('joinRoom', (room)=>{
        if(socket.currentroom){
            socket.leave(socket.currentroom);
        }
        socket.join(room);
        socket.currentroom = room;
    })


    socket.on('message', ({room, message})=>{
        io.to(socket.currentroom).emit('message', message);
    })

    socket.on('disconnect', ()=>{
       console.log('disconnect');       
    })

    
})



server.listen(3000, ()=>{
    console.log("server runing on http://localhost:3000");
    
})