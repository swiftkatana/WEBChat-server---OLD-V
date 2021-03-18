const express = require("express");
const bcrypt = require("bcrypt");
const legit = require("legit");

const { User } = require("../../models/User");
const { responedList } = require("../../../respondList");
const router = express.Router();
const saltPassword = 10;


router.post("/register", async (req, res) => {
  try {
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

    const hash = await bcrypt.hash(password, saltPassword)
    let todayDate = Date.now();
    const user = new User({
      email,
      password: hash,
      firstName,
      lastName,
      createAt: todayDate,
      updateAt: todayDate,
      loginAt: todayDate,

    });

    await user.save()

    res.send({ user: user.filterUser() });


  } catch (error) {
    if (error.code === 11000)
      res.send(responedList.UserIsAlreadyCreated);
    else
      res.send(responedList.DBError);
    console.log(error)
  }

});





exports.registerRoute = router;