const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../../models/User");
const { responedList } = require("../../../respondList");
const router = express.Router();
const saltPassword = 10;

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

router.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.send(responedList.infoInvalid);
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

router.post("/createrestpasswordcode", async (req, res) => {
  let { email } = req.body;

  if (!email) {
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

  let restCode = Math.floor(
    Math.random() * (999999990000000 - 1000009999999) + 1000009999999
  )
    .toString()
    .replace("3", "th3210ty")
    .replace("6", "ghew#!");
  user.RESTPASW = restCode;

  user.save((err) => {
    if (err) {
      res.send(responedList.FaildSave);
    } else {
      ejs.renderFile(
        path.join(__dirname, "../src/restPassword.ejs"),
        { name: user.fullName, restCode },
        function (err, data) {
          if (err) {
            console.log(err);
            res.send(responedList.DBError);
            return;
          }
          var mailOptions = {
            from: "WorkUsuppurt@gmail.com",
            to: email,

            subject: "בקשתה לשנות סיסמה ",
            html: data,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.send(responedList.DBError);
              console.log(error);
            } else {
              res.send("good");
              console.log("Email sent: " + info.response);
            }
          });
        }
      );
    }
  });
});

module.exports = router;
