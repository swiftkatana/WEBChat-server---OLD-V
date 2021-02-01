const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../../models/User");
const { responedList } = require("../../respondList");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send(responedList.infoInvalid);
    return;
  }

  let user = await User.findOne({ email })
    .catch((err) => responedList.DBError)
    .then((user) => user || responedList.usersNotFound);
  if (user.err) {
    res.send(user);
    return;
  }

  bcrypt.compare(password, user.password, (err, login) => {
    if (err) {
      console.log("password not right\n" + err);
      res.send(responedList.infoInvalid);
      return;
    }
    if (login) {
      if (req.users[email]) {
        res.send(responedList.loginFaildAlreadyConnect);
        return;
      }
      res.send(user.filterUser());
      // console.log("someone login to our web sucssesfull email: " + email);
    } else {
      console.log(
        req.ip + " just try login but not! password not good  :  " + email
      );
      res.send(responedList.infoInvalid);
    }
  });
});



exports.loginRoute = router;