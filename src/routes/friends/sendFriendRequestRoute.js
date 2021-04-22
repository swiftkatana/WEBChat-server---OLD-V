const express = require("express");
const { User } = require("../../models/User");
const { responedList } = require("../../../respondList");
const { FriendDB } = require("../../models/friend");
const { CreateChat } = require("../../models/Chat");

const router = express.Router();


router.post("/sendfriendrequest", async (req, res) => {
  try {
    // sender is the one who sent the request
    // geter is the one who got the request
    let { geter, sender } = req.body;
    if (!geter || !sender) {
      res.send(responedList.infoInvalid);
      return;
    }

    const docsender = await User.findOne({ email: sender.email })
    if (!docsender) {
      res.status(404).send(responedList.usersNotFound);
      return;
    }

    const docgeter = await User.findOne({ email: geter.email })
    if (!docgeter) {
      res.status(400).send(responedList.usersNotFound);
      return;
    }

    geter.status = "geter";
    sender.status = "sender";
    geter._id = docgeter._id;
    sender._id = docsender._id;
    const chat = await CreateChat([docsender._id, docgeter._id], "friends");
    let newFriendShip = await FriendDB.createFriendShip(docsender._id, docgeter._id, chat._id);
    newFriendShip.sendReq(docsender._id)

    let todayDate = Date.now();
    docgeter.updateAt = todayDate;
    docsender.updateAt = todayDate;

    await docgeter.save();
    await docsender.save()
    req.io.emit("userLive" + docgeter._id, { data: sender, type: "NEW_FRIEND_REQUEST" });
    res.send({ user: geter });

  } catch (error) {
    console.log(error)

    res.status(404).send(responedList.DBError);

  }

});


exports.sendFriendRequestRoute = router;