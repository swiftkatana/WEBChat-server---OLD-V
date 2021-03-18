const express = require('express');
const { User } = require('../../models/User');
const { responedList } = require('../../../respondList');

const router = express.Router();

router.get("/getUserForSerach", async (req, res) => {
  try {
    let _id = req.query._id;
    let query = req.query.query;

    if (!_id) {
      res.send(responedList.infoInvalid);
      return;
    }

    let userDoc = await User.findOne({ _id });
    if (!userDoc) {
      res.send(responedList.DBError);
      return;
    }
    var usersProjection = {
      __v: false,
      _id: false,
      admin: false,
      phone: false,
      address: false,
      createAt: false,
      updateAt: false,
      loginAt: false,
      chats: false,
      connections: false,
      password: false,
    };

    const connectionIds = [userDoc._id, ...Object.keys(userDoc.connections)]
    let filterUsers = {
      $and: [
        { email: { $regex: `.*${query}.*` } },
        { _id: { $nin: connectionIds } }
      ],
    };

    let users = await User.find(filterUsers, usersProjection);
    if (!users.length) {
      filterUsers = {
        $and: [
          { firstName: { $regex: `.*${query}.*` } },
          { _id: { $nin: connectionIds } }
        ],
      };
      users = await User.find(filterUsers, usersProjection);


    }


    res.send({ users });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }

});

exports.getUsersForSearchRoute = router;