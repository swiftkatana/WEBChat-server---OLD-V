const { responedList } = require("../respondList");

module.exports = function (app, io) {
  const { User, UpdateFriends } = require("../models/User");
  const { Chat, CreateChat } = require("../models/Chat");
  function er(user1, user2, errorMessage, res) {
    io.emit("error" + user1._id, errorMessage);
    io.emit("error" + user2._id, errorMessage);
    res.send("bad");
    console.log(errorMessage);
  }

  // there  are few types of status that a frirend can have
  // 1 "waiting " mean that you got a friend request but you didnt accept it
  // 2 "sender" mean that you send a friend request but the request still not got respond
  // 3 "accept"  mean that they are aceept and now they are friends
  // 4 "decline" mean  that your friend request got decline
  // 5 "idecline" mean that you decline tha friend request
  // 6 "delete"   mean that someone delete  each other
  // 7 "iblock" mean that i block friend/not yet a friend
  // 8 "block" mean that i got block
  app.post("/api/user/addnewfriend", async (req, res) => {
    // you need to send obj that contian geter that is the one to will get the req and sender is clear!
    let { sender, geter } = req.body;
    if (!sender || !geter) {
      res.send(responedList.infoInvalid);
      return;
    }
    geter.status = "waiting";
    sender.status = "sender";
    let docs = await UpdateFriends(sender, geter);
    if (docs.err) {
      res.send(docs);
      return;
    }
    io.emit("newFriendReq" + sender._id, geter);
    io.emit("newFriendReq" + geter._id, sender);
  });

  app.post("/api/user/friendreqaccept", async (req, res) => {
    //status is mean if nothing bad hppen ...
    // you need to send obj thet contain accepter who is the one who got the req and now he/she accept the req ; sender is the one send the friend req OMG! ;
    let { sender, geter } = req.body;
    if (!sender || !geter) {
      res.send(responedList.infoInvalid);
      return;
    }
    geter.status = "accept";
    sender.status = "accept";
    const data = await CreateChat([geter, sender], "friends");
    if (data.err) {
      res.send(data);
      return;
    }

    geter.chatId = data._id;
    sender.chatId = data._id;
    let docs = await UpdateFriends(sender, geter);
    if (docs.err) {
      res.send(docs);
      return;
    }

    io.emit("FirendsReqAccept" + sender._id, geter);
    io.emit("FirendsReqAccept" + geter._id, sender);
  });

  app.post("/api/user/deletefriendreq", async (req, res) => {
    // you need to send a obj that contain sender & geter
    //sender is the one to delete the friend
    //geter is the one who got delete

    let { sender, geter } = req.body;
    if (!sender || !geter) {
      res.send(responedList.infoInvalid);
      return;
    }

    const docSender = await User.findOne({ _id: sender._id })
      .catch((err) => responedList.DBError)
      .then((doc) => doc || responedList.usersNotFound);
    if (docSender.err) {
      res.send(docSender);
    }

    const docGeter = await User.findOne({ _id: geter._id })
      .catch((err) => responedList.DBError)
      .then((doc) => doc || responedList.usersNotFound);
    if (docGeter.err) {
      res.send(docGeter);
    }

    delete docSender.connections[geter._id];
    delete docGeter.connections[sender._id];
    docGeter.markModified("connections");
    thean;
    docSender.markModified("connections");
    docGeter.save((err) => {
      if (err) {
        res.send(responedList.FaildSave);
      }

      docSender.save((err) => {
        if (err) {
          res.send(responedList.FaildSave);
        } else {
          console.log("delete friend");
          io.emit("deleteFriend" + sender._id, geter);
          io.emit("deleteFriend" + geter._id, sender);
          res.send("status");
        }
      });
    });
  });

  app.post("/api/user/blockfriendreq", async (req, res) => {
    //this api is for block a friend. this api  need to get obj with 2 obj sender who is the one who want to block
    // and the geter is the one who get block

    let { sender, geter } = req.body;
    sender.status = "iblock";
    geter.status = "block";
    let docs = await UpdateFriends(sender, geter);
    if (docs.err) {
      res.send(docs);
      return;
    }
    console.log("block friend");
    io.emit("blockFriendReq" + sender._id, geter);
    io.emit("blockFriendReq" + geter._id, sender);
    res.send("status");
  });

  app.post("/api/user/unblockFirend", async (req, res) => {
    //allGoodORNot is mean if nothing bad hppen ...
    // you need to send obj that contian geter that is the one to will get unblock and sender is the one who want to unblock!
    let { sender, geter } = req.body;
    sender.status = "accept";
    geter.status = "accept";
    let docs = await UpdateFriends(sender, geter);
    if (docs.err) {
      res.send(docs);
      return;
    }
    console.log("unblock friend");
    io.emit("FirendsReqAccept" + sender._id, geter);
    io.emit("FirendsReqAccept" + geter._id, sender);
    res.send("status");
  });

  app.post("/api/user/getUserForSerach", (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        console.log(err);
        res.send("not found");
      } else {
        const usersFilter = [];
        users.forEach((user) => {
          usersFilter.push({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
            email: user.email,
            imageProfile: user.imageProfile,
          });
        });
        res.send(usersFilter);
      }
    });
  });
};
