require('dotenv').config();

 const express = require('express'),

 socket = require('socket.io'),
 mongoose = require("mongoose"),
 
 { RateLimit } = require('./rateLimit'),
 { addMessageToAChat } = require('./models/Chat');


const rateLimit = new RateLimit();

//App setup
const app = express();


mongoose.connect(process.env.DB_mongodb,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err) console.log(err)
    else console.log("mongoDb connected")
});

let port = process.env.PORT||1029
const server = app.listen(port,()=>{
    console.log('listen to port '+port)
});



// static files
 require('./AppUses')(app)

//socket setup
let io =socket(server);


app.get('/',(req,res)=>{
    console.log(req.ip)
  res.sendFile(__dirname+"/index.html");
})
console.log(__dirname+"\index.html");



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


//routs
require('./routes/friendsSystem')(app,io)
require('./routes/userSystem')(app,io)
require('./routes/chatsSystem')(app,io)

