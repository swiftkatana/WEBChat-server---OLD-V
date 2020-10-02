require('dotenv').config();

 const express = require('express');
 const mongoose = require("mongoose");
 const socketIo = require('socket.io');
 const { RateLimit } = require('./rateLimit');
const   { addMessageToAChat } = require('./models/Chat');


const rateLimit = new RateLimit();

//App setup
const app = express();


const port = process.env.PORT||1029;
const server = app.listen(port,()=>{
    console.log('listen to port '+port);
});
const io = new socketIo(server)




// static files / middlewares
require('./AppUses')(app);

// DB 

mongoose.connect(process.env.DB_mongodb,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err) console.log(err);
    else console.log("mongoDb connected");
});

 
// serve the website
app.get('/',(req,res)=>{
    console.log(req.ip);
  res.sendFile(__dirname+"/build/index.html");
});


// routes for sockets on messages



io.on('connection',(socket)=>{

    socket.on('typeing',(data)=>{
        socket.broadcast.emit('typeing'+data.chatId,data);
    })

    socket.on('chat',(data)=>{
        if(!rateLimit.CheackRateLimit(data.senderId,10000)){
            return null
        }
        io.sockets.emit('chat'+data.chatId,data);
        addMessageToAChat(data);
    });

    socket.on('ready',data=>{
        socket.broadcast.emit('announce'+data,'new user enter');

    })

    socket.on('signal',(req)=>{
        console.log(req)
        socket.broadcast.emit('signaling_message'+req.room,{
            type:req.type,
            message:req.message
        })

    });

   

})

//routs
require('./routes/friendsSystem')(app);
require('./routes/userSystem')(app);
require('./routes/chatsSystem')(app);