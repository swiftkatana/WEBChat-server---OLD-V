const express = require("express");
const { responedList } = require("../../../respondList");

const router = express.Router();


router.post("/blockfriendreq", async (req, res) => {
  try {
    //this api is for block a friend. this api  need to get obj with 2 obj user1 who is the one who want to block
    // and the user2 is the one who get block

    let { user1, user2 } = req.body;
    user1.status = "unBlock";
    user2.status = "block";
    const docuser1 = await User.findOne({ _id: user1._id })
    if (!docuser1) {
      res.status(500).send(responedList.infoInvalid);

    }

    const docuser2 = await User.findOne({ _id: user2._id })
    if (!docuser2) {
      res.status(500).send(responedList.infoInvalid);
    }
    let user2InUser1 = docuser1.connections[user2._id]
    let user1InUser2 = docuser2.connections[user1._id]
    if (!user1InUser2 || !user2InUser1 || user1InUser2.status === 'unBlock') {
      res.send({ error: "you cant block him/her" });
      return;
    }

    docuser1.connections[user2._id] = user2;
    docuser2.connections[user1._id] = user1;

    docuser1.markModified("connections");
    docuser2.markModified("connections");

    await docuser2.save()

    await docuser1.save();

    req.io.emit("userLive" + user2._id, { data: user1, type: "blockFriendReq" });
    res.send({ data: user2 });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }

});

exports.blockRequestRoute = router