const express = require("express");
const { CreateChat } = require("../../models/Chat");
const { User } = require("../../models/User");
const { responedList } = require("../../../respondList");

const router = express.Router();

router.post("/friendreqaccept", async (req, res) => {
  try {
    // user1 is the one who got accepted
    // user2 is the  one who accepted the request 
    let { user1, user2, type } = req.body;

    if (!user1 || !user2) {
      res.send(responedList.infoInvalid);
      return;
    }

    user1.status = "accept";
    user2.status = "accept";

    const data = await CreateChat([user2, user1], "friends");

    user1.chatId = data._id;
    user2.chatId = data._id;

    const docuser1 = await User.findOne({ _id: user1._id })
    if (!docuser1) {
      res.send(responedList.DBError);
      return;
    }



    const docuser2 = await User.findOne({ _id: user2._id })
    if (!docuser2) {
      res.send(responedList.DBError);
      return;
    }
    let user2InUser1 = docuser1.connections[user2._id]
    let user1InUser2 = docuser2.connections[user1._id]

    if (type === 'unBlock') {
      if (user2InUser1.status !== 'unBlock' || user1InUser2.status !== 'block') {
        res.send({ error: "you trying to send a bad request on unBlock" })
        return;
      }

    } else if (type === 'accept') {

      if (user2InUser1.status !== 'sender' || user1InUser2.status !== 'geter') {
        res.send({ error: "you trying to send a bad request on accept" })
        return;
      }

    } else {
      console.log('type of accept request', type)
    }






    docuser1.chats[user2._id] = ({ _id: data._id, type: "friend", status: true });
    docuser2.chats[user1._id] = ({ _id: data._id, type: "friend", status: true });

    let todayDate = Date.now();
    docuser1.updateAt = todayDate;
    docuser2.updateAt = todayDate;

    docuser1.connections[user2._id] = user2;
    docuser2.connections[user1._id] = user1;

    docuser1.markModified("chats");
    docuser2.markModified("chats");

    docuser1.markModified("connections");
    docuser2.markModified("connections");

    await docuser1.save()
    await docuser2.save()

    user1.chat = data;
    user2.chat = data;

    res.send({ friend: user1 });
    req.io.emit("userLive" + user1._id, { data: user2, type: "firendReqAccept" });

  } catch (error) {
    res.status(404).send({ error });
  }

});


exports.friendReqAcceptRoute = router;