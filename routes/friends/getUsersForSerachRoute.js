const express = require('express');
const { User } = require('../../models/User');
const { responedList } = require('../../respondList');

const router = express.router();

router.get("/getUserForSerach", async (req, res) => {
  try {
    let _id = req.query.userId;
    const usersFilter = [];
    if (!_id) {
      res.send(responedList.infoInvalid);
      return;
    }

    let userDoc = await User.findOne({ _id });
    if (!userDoc) {
      res.send(responedList.DBError);
      return;
    }

    const users = await User.find();


    users.forEach((user) => {
      if (userDoc.connection[user._id] || user._id === userDoc._id)
        continue;
      usersFilter.push({
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        email: user.email,
        imageProfile: user.imageProfile,
      });
    })
    res.send(usersFilter);
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }

});

exports.getUsersForSearchRoute = router; 