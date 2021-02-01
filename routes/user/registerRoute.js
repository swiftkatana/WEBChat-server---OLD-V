const express = require("express");
const bcrypt = require("bcrypt");
const legit = require("legit");

const { User } = require("../models/User");
const { responedList } = require("../respondList");
const router = express.Router();
const saltPassword = 10;


router.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.send(responedList.infoInvalid);
    return;
  }
  const legitEmail = await legit(email);
  if (!legitEmail.isValid) {
    loger("email not valid");

    res.send(responedList.emailNotExistsL);
    return;
  }
  bcrypt.hash(password, saltPassword, (err, hash) => {
    if (err) {
      console.log(err);
      res.send(responedList.DBError);
    }

    const user = new User({
      email,
      password: hash,
      firstName,
      lastName,
    });

    user.save((err) => {
      if (err) {
        console.log("someone try to register but got error : " + err);
        if (err.code === 11000) res.send(responedList.UserIsAlreadyCreated);
        else res.send(responedList.DBError);
      } else {
        console.log("someone register to our web now this email : " + email);
        res.send(user.filterUser());
      }
    });
  });
});





exports.registerRoute = router;