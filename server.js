require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

const { RateLimit } = require("./rateLimit");
const { addMessageToAChat } = require("./models/Chat");
const userSystem = require("./routes/userRoute");
const friendSystem = require("./routes/friendRoute");
const chatRoute = require("./routes/chatsRoute");
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
app.use('/api/*', (req, res, next) => {
  req.users = users;
  req.io = io;
  next();
})

app.use(
  "/api/user", logi
);
app.use(
  "/api/user",
 ,
  friendSystem
);
app.use(
  "/api/chat",
  (req, res, next) => {
    req.io = io;
    next();
  },
  chatRoute
);

console.clear();
console.log(
  "--------------------------------------------------------------------------------------------------------------------------------"
);
server.listen(port, () => {
  console.log("listen to port " + port);
});

io.on("connect", (socket) => {
  socket.on("loginToTheWebSite", (email) => {
    //if anyone is logged in with this useremail then refuse
    if (!users[email]) {
      //save user socket on the server
      users[email] = socket;
      socket.email = email;
    }
  });
  socket.on("typeing", (data) => {
    socket.broadcast.emit("typeing" + data.chatId, data);
  });

  socket.on("message", async (data) => {
    console.log(data);
    if (!rateLimit.CheackRateLimit(data.senderId, 10000)) {
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
    delete users[socket.email];
  });

  socket.on("disconnect", () => {
    if (socket.email) {
      // console.log("user just disconnected from the server : " + socket.email);
      delete users[socket.email];
    }
    // else console.log("user just disconnected from the server : ");
  });
});
