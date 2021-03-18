const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models/User");
const { responedList } = require("../../respondList");
const router = express.Router();
const saltPassword = 10;


router.post("/changepassword", async (req, res) => {
  let { newPassword, oldPassword, email } = req.body;

  if (!newPassword || !oldPassword || !email) {
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

  bcrypt.compare(oldPassword, user.password, (err, login) => {
    if (err) {
      res.send(responedList.infoInvalid);
      return;
    } else {
      if (!login) {
        res.send(responedList.infoInvalid);
        return;
      }

      bcrypt.hash(newPassword, saltPassword, (err, hash) => {
        if (err) {
          res.send(responedList.infoInvalid);
          return;
        }

        user.password = hash;
        user.save((err) => {
          if (err) {
            res.send(responedList.FaildSave);

            return;
          } else {
            res.send("good");
          }
        });
      });
    }
  });
});

exports.changePasswordRoute = router;