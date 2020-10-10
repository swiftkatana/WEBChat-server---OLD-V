require('dotenv').config();
const  app = require('express')();
const server =require('http').createServer(app);
const  io = require('socket.io')(server);
const  mongoose = require("mongoose");
 
const { RateLimit } = require('./rateLimit');
const  { addMessageToAChat } = require('./models/Chat');




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



console.clear()

let users ={};
setInterval(()=>console.log('amount of users connected  :',Object.keys(users).length),600000)

io.on('connect',(socket)=>{
  console.log('connect')




  socket.on('loginToTheWebSite',name=>{
    //if anyone is logged in with this username then refuse 
    if(users[name]) { 
    console.log("two users try to be on the same time id:", name); 


    } else { 
       //save user socket on the server 
       users[name] = socket; 
       socket.name = name; 
       console.log("User logged:", name); 

       socket.send(true);

           
    } 
  });
  
  
  
  socket.on('typeing',(data)=>{
    socket.broadcast.emit('typeing'+data.chatId,data);
  });
  
  socket.on('chat',(data)=>
  {
    if(!rateLimit.CheackRateLimit(data.senderId,10000)){
      return null
    }
    io.sockets.emit('chat'+data.chatId,data);
    addMessageToAChat(data);
  });
  socket.on('leave',data=>{
    console.log("Disconnecting from", data.name); 
    var conn = users[data.name]; 
    conn.otherName = null; 
   
    //notify the other user so he can disconnect his peer socket 
    if(conn != null) { 
       sendTo(conn, { 
          type: "leave" 
       }); 
    } 
  });

   socket.on('candidate',data=>{
     console.log("Sending candidate to:",data.name); 
     var conn = users[data.name];  
 
     if(conn != null) { 
        sendTo(conn, { 
           type: "candidate", 
           candidate: data.candidate 
        });
     } 
   });
   socket.on('offer',data=>{
     //for ex. UserA wants to call UserB 
    console.log("Sending offer to: ", data.name); 


	
   //if UserB exists then send him offer details 
   var conn = users[data.name]; 
	
   if(conn != null){ 
      //setting that UserA connected with UserB 
      socket.otherName = data.name; 
		
      sendTo(conn, { 
         type: "offer", 
         offer: data.offer, 
         name: socket.name 
      }); 
   }
    //  socket.broadcast.emit('candidate'+data.chatId,JSON.stringify(data));
  });
  socket.on('answer',data=>{

    console.log("Sending answer to: ", data.name); 
    //for ex. UserB answers UserA 
    var conn = users[data.name]; 

    if(conn != null) { 
      socket.otherName = data.name; 
       sendTo(conn, { 
          type: "answer", 
          answer: data.answer 
       }); 
    } 
  });


    socket.on('disconnect',()=>{
  	
      if(socket.name) { 
        delete users[socket.name]; 
      
           if(socket.otherName) { 
              console.log("Disconnecting from ", socket.otherName);
              var conn = users[socket.otherName]; 
              conn.otherName = null;  
          
              if(conn != null) { 
                 sendTo(conn, { 
                    type: "leave" 
                 });
              }  
           } 
        } 
     });  
    
    
  
   

});

// static files
require('./AppUses')(app)


//routs
require('./routes/userSystem')(app,io,users)
require('./routes/friendsSystem')(app,io)
require('./routes/chatsSystem')(app,io)





server.listen(port,()=>{
    console.log('listen to port '+port)
});



function chackIfItsJSON(message){
  var data; 
  //accepting only JSON messages 
  try {
     data = JSON.parse(message); 
  } catch (e) { 
     console.log("Invalid JSON"); 
     data = {}; 
  } 

  return data
}
function sendTo(socket, message) { 
  socket.send(message); 
}