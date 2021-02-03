const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../../models/User");
const { responedList } = require("../../respondList");
const router = express.Router();
const saltPassword = 10;



router.post("/restpasswordrestcode", async (req, res) => {
  let { email, restCode, newPassword } = req.body;

  if (!email || !restCode || !newPassword) {
    res.send(responedList.infoInvalid);
    return;
  }

  let user = await User.findOne({ email })
    .catch((err) => responedList.DBError)
    .then((doc) => doc || responedList.usersNotFound);
  if (user.err) {
    res.send(user);
    return;
  }

  if (String(user.RESTPASW).trim() !== String(restCode).trim()) {
    res.send(responedList.NotExists);
    return;
  }
  bcrypt.hash(newPassword, saltPassword, async (err, hash) => {
    if (err) {
      res.send(responedList.DBError);
      return;
    }
    user.password = hash;
    user.RESTPASW = "";

    user.save((err) => {
      if (err) {
        res.send(responedList.FaildSave);
        return;
      }

      res.send(user.filterUser());
    });
  });
});



exports.restPasswordWithCode = router;