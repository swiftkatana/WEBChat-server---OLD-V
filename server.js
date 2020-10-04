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


const connections = [];
const clients = [];

io.set('origins', '*:*');
io.on('connection', socket => {
  connections.push(socket);
  clients.push({ socket_id: socket.id });
  console.log('Connected: %s sockets connected ', connections.length);
  //my code
        socket.on('typeing',(data)=>{
            socket.to(data.chatId).emit('typeing'+data.chatId,data);
        });

        socket.on('chat',(data)=>
        {
            console.log('message ',data)
            if(!rateLimit.CheackRateLimit(data.senderId,10000)){
                return null
            }
            socket.to(data.chatId).emit('chat'+data.chatId,data);
            addMessageToAChat(data);
        });
        //not my 
  socket.on('join', (room, callback) => {
    const clients = io.sockets.adapter.rooms[room];
    const numClients = (typeof clients !== 'undefined') ? clients.length : 0;
    console.log('joined room', room);
    if (numClients > 1) {
      return callback('already_full');
    }
    else if (numClients === 1) {
      socket.join(room);
      io.in(room).emit('ready');
    }
    else {
      socket.join(room);
    }

    callback();
  });

  socket.on('offer', (data) => {
    const { room, offer } = data;
    console.log('offer from: ', offer);
    socket.to(room).emit('offer', offer);
  });

  socket.on('answer', (data) => {
    const { room, answer } = data;
    console.log('answer from: ', answer);
    socket.to(room).emit('answer', answer);
  });

  socket.on('candidate', (data) => {
    const { room, candidate } = data;
    console.log('candidate: ', candidate);
    socket.to(room).emit('candidate', candidate);
  });

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected, ', connections.length);
    clients.forEach((client, i) => {
      if (client.socket_id === socket.id) {
        clients.splice(i, 1);
      }
    });
  });
});




// io.on('connection',(socket)=>{
//     socket.on('typeing',(data)=>{
//         socket.broadcast.emit('typeing'+data.chatId,data);
//     });

//     socket.on('chat',(data)=>
//     {
//         console.log('message ',data)
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
require('./routes/userSystem')(app,io)
require('./routes/friendsSystem')(app,io)
require('./routes/chatsSystem')(app,io)





