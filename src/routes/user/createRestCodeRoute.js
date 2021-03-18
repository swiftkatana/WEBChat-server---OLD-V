const express = require("express");

const { User } = require("../../models/User");
const { responedList } = require("../../../respondList");
const router = express.Router();



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
