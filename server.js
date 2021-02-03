require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

const { RateLimit } = require("./rateLimit");
const { addMessageToAChat } = require("./models/Chat");

const { loginRoute } = require("./routes/user/loginRoute");
const { registerRoute } = require("./routes/user/registerRoute");
const { blockRequestRoute } = require("./routes/friends/blockRequestRoute");
const { deleteFriendRoute } = require("./routes/friends/deleteFriendRoute");
const { friendReqAcceptRoute } = require("./routes/friends/friendReqAcceptRoute");
const { getFriends } = require("./routes/friends/getFriendsRoute");

const rateLimit = new RateLimit();

mongoose.connect(
  process.env.DB_mongodb,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("mongoDb connected");
  }
);

const port = process.env.PORT || 1029;

app.get("/", (req, res) => {
  console.log(req.ip);
  res.sendFile(__diremail + "/build/index.html");
});

console.clear();

let OnlineUsers = {};

setInterval(
  () => console.table("OnlineUsers connected  :", OnlineUsers),
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
app.use("/api/friends",);




app.use("/api/chat", chatRoute);

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
