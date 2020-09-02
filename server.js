require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const mongoose = require("mongoose");
const { RateLimit } = require('./rateLimit');
const { addMessageToAChat } = require('./models/Chat');


const rateLimit = new RateLimit();

//App setup
const app = express();


mongoose.connect(process.env.DB_mongodb,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err) console.log(err)
    else console.log("mongoDb connected")
});


const server = app.listen(1029,()=>{
    console.log('listen to port 1029')
});



// static files
 require('./AppUses')(app)


//socket setup
const io =socket(server);


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

   

})

// setInterval(()=>console.log('10 sec pass'),10000);
//routs
require('./routes/friendsSystem')(app,io)
require('./routes/userSystem')(app,io)
require('./routes/chatsSystem')(app,io)

