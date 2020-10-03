require('dotenv').config();
const  app = require('express')();
const http =require('http').createServer(app);
const  io = require('socket.io')(http);
const  mongoose = require("mongoose");
 
const { RateLimit } = require('./rateLimit');
const  { addMessageToAChat } = require('./models/Chat');




const rateLimit = new RateLimit();

mongoose.connect(process.env.DB_mongodb,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err) console.log(err)
    else console.log("mongoDb connected")
});

const port = process.env.PORT||1029

http.listen(port,()=>{
    console.log('listen to port '+port)
});


app.get('/',(req,res)=>{
    console.log(req.ip)
  res.sendFile(__dirname+"/build/index.html");
})






io.on('connection',(socket)=>{

    socket.on('typeing',(data)=>{
        socket.broadcast.emit('typeing'+data.chatId,data);
    });

    socket.on('chat',(data)=>
    {
        console.log('message ',data)
        if(!rateLimit.CheackRateLimit(data.senderId,10000)){
            return null
        }
        io.sockets.emit('chat'+data.chatId,data);
        addMessageToAChat(data);
    });

    socket.on('ready',data=>{
        socket.broadcast.emit('announce'+data,'new user enter');

    });

    socket.on('signal',(req)=>{
        console.log(req)
        socket.broadcast.emit('signaling_message'+req.room,{
            type:req.type,
            message:req.message
        });

    });

   

});

// static files
require('./AppUses')(app)


//routs
require('./routes/userSystem')(app,io)
require('./routes/friendsSystem')(app,io)
require('./routes/chatsSystem')(app,io)





