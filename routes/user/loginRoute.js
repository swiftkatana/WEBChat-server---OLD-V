const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../../models/User");
const { responedList } = require("../../respondList");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send(responedList.infoInvalid);
      return;
    }

    let user = await User.findOne({ email })

    if (!user) {
      res.send(responedList.usersNotFound);
      return;
    }

    user.loginAt = Date.now();

    await user.save();



    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      console.log("password not right\n" + err);
      res.send(responedList.usersNotFound);
      return;
    }
    if (req.users[email]) {
      //  if the user already login we will kick him/her from the web and login from a new tab
      // need to create  ---!!!!!!!!

    }
    res.send(user.filterUser());

  } catch (error) {
    res.send(responedList.DBError);
  }

});



exports.loginRoute = router;