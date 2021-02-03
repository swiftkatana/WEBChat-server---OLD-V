const express = require("express");
const { User } = require("../../models/User");
const { responedList } = require("../../respondList");

const router = express.Router();

router.post("/deletefriendreq", async (req, res) => {
  // you need to send a obj that contain user1 & user2
  //user1 is the one to delete the friend
  //user2 is the one who got delete
  try {
    let { user1, user2 } = req.body;
    if (!user1 || !user2) {
      res.send(responedList.infoInvalid);
      return;
    }

    const docUser1 = await User.findOne({ _id: user1._id });
    if (!docUser1) {
      res.send(responedList.usersNotFound);
      return;
    }

    const docUser2 = await User.findOne({ _id: user2._id });
    if (!docUser2) {
      res.send(responedList.usersNotFound);
      return;
    }
    let user2InUser1 = docuser1.connections[user2._id]
    let user1InUser2 = docuser2.connections[user1._id]
    if (!user1InUser2 || !user2InUser1 || user1InUser2.status === 'unBlock') {
      res.send({ error: "you cant delete him/her" });
      return;
    }


    docUser1.chats[user2._id].status = false;
    docUser2.chats[user1._id].status = false;

    docUser1.connections[user2._id].status = 'delete';
    docUser2.connections[user1._id].status = 'delete';


    docUser1.markModified("chats");
    docUser2.markModified("chats");
    docUser1.markModified("connections");
    docUser2.markModified("connections");

    await docUser1.save()
    await docUser2.save()

    console.log("delete friend");
    req.io.emit("userLive" + user2._id, { data: user1, type: "deleteFriend" });
    res.send({ friend: user2 });
  } catch (error) {
    res.status(404).send({ error });
  }

});

exports.deleteFriendRoute = router;