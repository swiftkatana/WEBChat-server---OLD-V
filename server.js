require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

const { RateLimit } = require("./rateLimit");
const { addMessageToAChat } = require("./src/models/Chat");

const { loginRoute } = require("./src/routes/user/loginRoute");
const { registerRoute } = require("./src/routes/user/registerRoute");

const { blockRequestRoute } = require("./src/routes/friends/blockRequestRoute");
const { deleteFriendRoute } = require("./src/routes/friends/deleteFriendRoute");
const { friendReqAcceptRoute } = require("./src/routes/friends/friendReqAcceptRoute");
const { getFriends } = require("./src/routes/friends/getFriendsRoute");
const { getUsersForSearchRoute } = require("./src/routes/friends/getUsersForSerachRoute");
const { sendFriendRequestRoute } = require("./src/routes/friends/sendFriendRequestRoute");
const { chatRoutechatRoute } = require("./src/routes/backup/chatsRouteBackUp");
const { createNewMessage } = require("./src/models/ChatMeassge");
const { connectDatabase } = require("./src/config/mongoDB");

const rateLimit = new RateLimit();
connectDatabase();
const port = process.env.PORT || 1029;

app.get("/", (req, res) => {
  console.log(req.ip);
  res.sendFile(__dirname + "/build/index.html");
});

console.clear();

let OnlineUsers = {};

setInterval(
  () => console.log("OnlineUsers connected  :", Object.keys(OnlineUsers)),
  600000
);

// static files
require("./AppUses")(app);

//routs
app.use('/api/*', (req, res, next) => {
  req.users = OnlineUsers;
  req.io = io;
  next();
})

app.use("/api/user", loginRoute,);
app.use("/api/user", registerRoute,);

app.use("/api/friends", blockRequestRoute);
app.use("/api/friends", deleteFriendRoute);
app.use("/api/friends", friendReqAcceptRoute);
app.use("/api/friends", getFriends);
app.use("/api/friends", getUsersForSearchRoute);
app.use("/api/friends", sendFriendRequestRoute);


app.use("/api/chat", chatRoutechatRoute);

console.clear();
console.log(
  "--------------------------------------------------------------------------------------------------------------------------------"
);
server.listen(port, () => {
  console.log("listen to port " + port);
});


updateUser = (email) => {
  OnlineUsers[email].lastTimeUseAt = Date.now();
}


io.on("connect", (socket) => {
  socket.on("loginToTheWebSite", (email) => {
    //if anyone is logged in with this useremail then refuse
    if (!OnlineUsers[email]) {
      //save user socket on the server
      socket.email = email;
      console.log('someone is logged in with this email', email);
      OnlineUsers[email] = socket;
    }
    updateUser(email);

  });
  socket.on("typeing", (data) => {
    updateUser(socket.email);
    socket.broadcast.emit("typeing" + data.chatId, data);
  });

  socket.on("message", async (data) => {
    updateUser(socket.email);
    console.log(data);
    if (!rateLimit.CheackRateLimit(socket.email, 10000)) {
      return null;
    }
    createNewMessage(data);
    let ids = await addMessageToAChat(data);
    if (ids.err) {
      console.log('i got error on sending message');
    } else
      ids.forEach(id => {
        io.sockets.emit('userLive' + id, { data, type: "message" });
      });
  });

  socket.on("leave", () => {
    // console.log("user just logout from the server : " + socket.email);
    delete OnlineUsers[socket.email];
  });

  socket.on("disconnect", () => {
    if (socket.email) {
      // console.log("user just disconnected from the server : " + socket.email);
      delete OnlineUsers[socket.email];
    }
    // else console.log("user just disconnected from the server : ");
  });
});
