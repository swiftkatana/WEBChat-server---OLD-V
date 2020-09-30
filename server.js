require('dotenv').config();

 const express = require('express.io'),

 mongoose = require("mongoose"),
 
 { RateLimit } = require('./rateLimit'),
 { addMessageToAChat } = require('./models/Chat');


const rateLimit = new RateLimit();

//App setup
const app = express();
app.http().io();

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



app.get('/',(req,res)=>{
    console.log(req.ip)
  res.sendFile(__dirname+"/build/index.html");
})
console.log(__dirname+"\index.html");


app.io.route('ready', function(req) {
	req.io.join(req.data.chat_room);
	req.io.join(req.data.signal_room);
	app.io.room(req.data).broadcast('announce', {
		message: 'New client in the ' + req.data + ' room.'
	})
})

app.io.route('send', function(req) {
    app.io.room(req.data.room).broadcast('message', {
        message: req.data.message,
		author: req.data.author
    });
})

app.io.route('signal', function(req) {
	//Note the use of req here for broadcasting so only the sender doesn't receive their own messages
	req.io.room(req.data.room).broadcast('signaling_message', {
        type: req.data.type,
		message: req.data.message
    });
})



// io.on('connection',(socket)=>{

//     socket.on('typeing',(data)=>{
//         socket.broadcast.emit('typeing'+data.chatId,data);
//     })

//     socket.on('chat',(data)=>{
//         if(!rateLimit.CheackRateLimit(data.senderId,10000)){
//             return null
//         }
//         io.sockets.emit('chat'+data.chatId,data);
//         addMessageToAChat(data);
//     });

//     socket.on('ready',data=>{
//         socket.broadcast.emit('announce'+data,'new user enter');

//     })

//     socket.on('signal',(req)=>{
//         console.log(req)
//         socket.broadcast.emit('signaling_message'+req.room,{
//             type:req.type,
//             message:req.message
//         })

//     });

   

// })


//routs
require('./routes/friendsSystem')(app)
require('./routes/userSystem')(app)
require('./routes/chatsSystem')(app)

