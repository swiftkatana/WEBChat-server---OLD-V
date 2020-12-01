const express = require("express");

const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const saltPassword = 10;
const { responedList } = require("../respondList");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
      res.send(responedList.infoInvalid);
    } else {
      if (user) {
        const {
          email,
          _id,
          firstName,
          lastName,
          imageProfile,
          connections,
        } = user;
        if (req.users[email]) {
          res.send(responedList.loginFaildAlreadyConnect);
          res.end();
        } else {
          bcrypt.compare(password, user.password, (err, login) => {
            if (err) {
              console.log("password not right\n" + err);
              res.send(responedList.infoInvalid);
            } else {
              if (login) {
                console.log(
                  "someone login to our web sucssesfull email: " + email
                );
                res.send({
                  email,
                  _id,
                  firstName,
                  lastName,
                  imageProfile,
                  connections,
                  DOYBC: user.createDateOfUser,
                });
              } else {
                console.log(
                  req.ip +
                    " just try login but not! password not good  :  " +
                    email
                );
                res.send(responedList.infoInvalid);
              }
            }
          });
        }
      } else {
        console.log(
          req.ip + " just try login but not! user not Found :  " + email
        );
        res.send(responedList.usersNotFound);
      }
    }
  });
});

router.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.ip + " just enter our register  page ");
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
    const { _id, imageProfile, connections } = user;

    user.save((err) => {
      if (err) {
        console.log("someone try to register but got error : " + err);
        if (err.code === 11000) res.send(responedList.UserIsAlreadyCreated);
        else res.send(responedList.DBError);
      } else {
        console.log("someone register to our web now this email : " + email);
        res.send({
          email,
          _id,
          firstName,
          lastName,
          imageProfile,
          friends: connections,
          DOYBC: user.createDateOfUser,
        });
      }
    });
  });
});

module.exports = router;
