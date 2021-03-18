const express = require("express");
const { User } = require("../../models/User");
const { responedList } = require("../../../respondList");

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
    let senderIngeter = docgeter.connections[sender._id]
    let geterInsender = docsender.connections[geter._id]
    if (geterInsender || senderIngeter) {

      if (senderIngeter.status !== 'delete' || geterInsender.status !== 'delete') {
        res.send({ error: "try to send a bad connection " });
        return;

      }
    }



    let todayDate = Date.now();
    docgeter.updateAt = todayDate;
    docsender.updateAt = todayDate;

    docgeter.connections[docsender._id] = sender;
    docsender.connections[docgeter._id] = geter;

    docgeter.markModified("connections");
    docsender.markModified("connections");

    geter.status = "geter";
    sender.status = "sender";
    geter._id = docgeter._id;
    sender._id = docsender._id;



    // await docgeter.save();
    // await docsender.save()
    console.log(docgeter._id)
    req.io.emit("userLive" + docgeter._id, { data: sender, type: "NEW_FRIEND_REQUEST" });
    res.send({ user: geter });

  } catch (error) {
    console.log(error)

    res.status(404).send(responedList.DBError);

  }

});


exports.sendFriendRequestRoute = router;