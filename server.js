require('dotenv').config();
const  app = require('express')();
const server =require('http').createServer(app);
// const  io = require('socket.io')(server);
const  mongoose = require("mongoose");
const SignalServer = require('react-rtc-real/server/SignalServer.js'); 
const signal = new SignalServer({ server });


const { RateLimit } = require('./rateLimit');
const  { addMessageToAChat } = require('./models/Chat');


signal.connect(); 


const rateLimit = new RateLimit();

mongoose.connect(process.env.DB_mongodb,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err) console.log(err)
    else console.log("mongoDb connected")
});

const port = process.env.PORT||1029



app.get('/',(req,res)=>{
    console.log(req.ip)
  res.sendFile(__dirname+"/build/index.html");
})












// io.on('connection',(socket)=>{

//     console.log('connect')
//     socket.on('typeing',(data)=>{
//         socket.broadcast.emit('typeing'+data.chatId,data);
//     });

//     socket.on('chat',(data)=>
//     {
//         if(!rateLimit.CheackRateLimit(data.senderId,10000)){
//             return null
//         }
//         io.sockets.emit('chat'+data.chatId,data);
//         addMessageToAChat(data);
//     });

//     socket.on('ready',data=>{
//         socket.broadcast.emit('announce'+data,'new user enter');

//     });

//     socket.on('signal',(req)=>{
//         console.log(req)
//         socket.broadcast.emit('signaling_message'+req.room,{
//             type:req.type,
//             message:req.message
//         });

//     });

   

// });

// static files
require('./AppUses')(app)


//routs
require('./routes/userSystem')(app,)
require('./routes/friendsSystem')(app,)
require('./routes/chatsSystem')(app,)





server.listen(port,()=>{
    console.log('listen to port '+port)
});
