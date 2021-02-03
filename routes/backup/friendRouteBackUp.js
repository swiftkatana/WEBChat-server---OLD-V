const express = require("express");
const { responedList } = require("../../respondList");
const { User, UpdateFriends } = require("../../models/User");
const { CreateChat } = require("../../models/Chat");

const router = express.Router();
// there  are few types of status that a frirend can have
// 1 "waiting " mean that you got a friend request but you didnt accept it
// 2 "sender" mean that you send a friend request but the request still not got respond
// 3 "accept"  mean that they are aceept and now they are friends
// 4 "decline" mean  that your friend request got decline
// 5 "idecline" mean that you decline tha friend request
// 6 "delete"   mean that someone delete  each other
// 7 "iblock" mean that i block friend/not yet a friend
// 8 "block" mean that i got block

router.post("/addnewfriend", async (req, res) => {
  // you need to send obj that contian geter that is the one to will get the req and sender is clear!
  let { sender, geter } = req.body;
  if (!sender || !geter) {
    res.send(responedList.infoInvalid);
    return;
  }
  geter.status = "waiting";
  sender.status = "sender";
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

  docSender.connections[geter._id] = geter;
  docGeter.connections[sender._id] = sender;
  docGeter.markModified("connections");
  docSender.markModified("connections");
  docGeter.save((err) => {
    if (err) {
      res.send(responedList.FaildSave);
    }

    docSender.save((err) => {
      if (err) {
        res.send(responedList.FaildSave);
      } else {
        req.io.emit("userLive" + sender._id, { data: geter, type: "newFriendReq" });
        req.io.emit("userLive" + geter._id, { data: sender, type: "newFriendReq" });
        res.send("status");
      }
    });
  });
});

router.post("/friendreqaccept", async (req, res) => {
  //status is mean if nothing bad hppen ...
  // you need to send obj thet contain accepter who is the one who got the req and now he/she accept the req ; sender is the one send the friend req OMG! ;
  let { sender, geter } = req.body;
  if (!sender || !geter) {
    res.send(responedList.infoInvalid);
    return;
  }
  geter.status = "iaccept";
  sender.status = "accept";
  const data = await CreateChat([geter, sender], "friends");
  if (data.err) {
    res.send(data);
    return;
  }

  geter.chatId = data._id;
  sender.chatId = data._id;

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
  docGeter.chats[data._id] = { _id: data._id, type: "friend" };
  docSender.chats[data._id] = { _id: data._id, type: "friend" };
  docSender.connections[geter._id] = geter;
  docGeter.connections[sender._id] = sender;
  docGeter.markModified("chats");
  docGeter.markModified("connections");
  docSender.markModified("chats");
  docSender.markModified("connections");
  docGeter.save((err) => {
    if (err) {
      res.send(responedList.FaildSave);
    }

    docSender.save((err) => {
      if (err) {
        res.send(responedList.FaildSave);
      } else {
        sender.chat = data;
        geter.chat = data;
        res.send(true);
        req.io.emit("userLive" + sender._id, { data: geter, type: "firendReqAccept" });
        req.io.emit("userLive" + geter._id, { data: sender, type: "firendReqAccept" });
      }
    });
  });
});

router.post("/deletefriendreq", async (req, res) => {
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
  delete docSender.chats[docSender.connections[geter._id].chatId];
  delete docGeter.chats[docSender.connections[geter._id].chatId];
  delete docSender.connections[geter._id];
  delete docGeter.connections[sender._id];
  docGeter.markModified("chats");
  docGeter.markModified("connections");
  docSender.markModified("chats");
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
        req.io.emit("userLive" + sender._id, { data: geter, type: "deleteFriend" });
        req.io.emit("userLive" + geter._id, { data: sender, type: "deleteFriend" });
        res.send("status");
      }
    });
  });
});

router.post("/blockfriendreq", async (req, res) => {
  //this api is for block a friend. this api  need to get obj with 2 obj sender who is the one who want to block
  // and the geter is the one who get block

  let { sender, geter } = req.body;
  sender.status = "iblock";
  geter.status = "block";
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

  docSender.connections[geter._id] = geter;
  docGeter.connections[sender._id] = sender;
  docGeter.markModified("connections");
  docSender.markModified("connections");
  docGeter.save((err) => {
    if (err) {
      res.send(responedList.FaildSave);
    }

    docSender.save((err) => {
      if (err) {
        res.send(responedList.FaildSave);
      } else {
        req.io.emit("userLive" + sender._id, { data: geter, type: "blockFriendReq" });
        req.io.emit("userLive" + geter._id, { data: sender, type: "blockFriendReq" });
        res.send("status");
      }
    });
  });
});

router.post("/unblockFirend", async (req, res) => {
  //allGoodORNot is mean if nothing bad hppen ...
  // you need to send obj that contian geter that is the one to will get unblock and sender is the one who want to unblock!
  let { sender, geter } = req.body;
  sender.status = "accept";
  geter.status = "accept";
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

  docSender.connections[geter._id] = geter;
  docGeter.connections[sender._id] = sender;
  docGeter.markModified("connections");
  docSender.markModified("connections");
  docGeter.save((err) => {
    if (err) {
      res.send(responedList.FaildSave);
    }

    docSender.save((err) => {
      if (err) {
        res.send(responedList.FaildSave);
      } else {
        console.log("unblock friend");
        req.io.emit("userLive" + sender._id, { data: geter, type: "newFriendReq" });
        req.io.emit("userLive" + geter._id, { data: sender, type: "newFriendReq" });
        res.send("status");
      }
    });
  });
});

router.post("/getUserForSerach", (req, res) => {
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

module.exports = router;
