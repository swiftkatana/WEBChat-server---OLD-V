const express = require("express");
const { User } = require("../../models/User");
const { responedList } = require("../../respondList");

const router = express.Router();


router.post("/sendfriendrequest", async (req, res) => {
  try {
    // user1 is the one who sent the request
    // user2 is the one who got the request
    let { user1, user2 } = req.body;
    if (!user1 || !user2) {
      res.send(responedList.infoInvalid);
      return;
    }
    user1.status = "geter";
    user2.status = "sender";

    const docuser2 = await User.findOne({ _id: user2._id })
    if (!docuser2) {
      res.send(responedList.usersNotFound);
      return;
    }

    const docuser1 = await User.findOne({ _id: user1._id })
    if (!docuser1) {
      res.send(responedList.usersNotFound);
      return;
    }
    let user2InUser1 = docuser1.connections[user2._id]
    let user1InUser2 = docuser2.connections[user1._id]
    if (user1InUser2 || user2InUser1) {

      if (user2InUser1.status !== 'delete' || user1InUser2.status !== 'delete') {
        res.send({ error: "try to send a bad connection " });
        return;

      }
    }



    let todayDate = Date.now();
    docuser1.updateAt = todayDate;
    docuser2.updateAt = todayDate;

    docuser1.connections[user2._id] = user2;
    docuser2.connections[user1._id] = user1;

    docuser1.markModified("connections");
    docuser2.markModified("connections");

    await docuser1.save();
    await docuser2.save()

    req.io.emit("userLive" + user2._id, { data: user1, type: "NEW_FRIEND_REQUEST" });
    res.send(docuser1.filterUser());

  } catch (error) {
    console.log(error)

    res.status(404).send(responedList.DBError);

  }

});


exports.sendFriendRequest = router;