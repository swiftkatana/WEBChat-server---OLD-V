require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

const { RateLimit } = require("./rateLimit");
const { addMessageToAChat } = require("./models/Chat");
const userSystem = require("./routes/userSystemRoute");
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

let users = {};
setInterval(
  () => console.log("amount of users connected  :", Object.keys(users).length),
  600000
);

// static files
require("./AppUses")(app);

//routs
app.use(
  "/api/user",
  (req, res, next) => {
    req.users = users;
    next();
  },
  userSystem
);
require("./routes/friendsSystem")(app, io);
require("./routes/chatsSystem")(app, io);

server.listen(port, () => {
  console.log("listen to port " + port);
});

io.on("connect", (socket) => {
  console.log("connect");

  socket.on("loginToTheWebSite", (email) => {
    //if anyone is logged in with this useremail then refuse
    if (!users[email]) {
      //save user socket on the server
      users[email] = socket;
      socket.email = email;
      console.log("User logged:", email);
      socket.send(true);
    }
  });
  socket.on("message", (data) => {
    console.log("message", data);
  });

  socket.on("typeing", (data) => {
    socket.broadcast.emit("typeing" + data.chatId, data);
  });

  socket.on("chat", (data) => {
    if (!rateLimit.CheackRateLimit(data.senderId, 10000)) {
      return null;
    }
    io.sockets.emit("chat" + data.chatId, data);
    addMessageToAChat(data);
  });

  socket.on("leave", (data) => {
    console.log("Disconnecting from", data.email);
    var conn = users[data.email];
    conn.otheremail = null;
  });

  socket.on("disconnect", () => {
    if (socket.email) {
      console.log("user just disconnected from the server : " + socket.email);
      delete users[socket.email];
    } else console.log("user just disconnected from the server : ");
  });
});
