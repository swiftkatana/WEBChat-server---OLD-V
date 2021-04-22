const express = require('express');
const { User } = require('../../models/User');
const { responedList } = require('../../../respondList');
const { FriendDB } = require('../../models/friend');

const router = express.Router();



router.get('/getFriends', async (req, res) => {
  try {

    const { _id } = req.query;

    const user = User.findOne({ _id });

    if (!user) {
      res.status(404).send(responedList.infoInvalid);
      return;
    }


    let connection = await FriendDB.getConnections(_id);



    res.send({ connection });

  } catch (error) {
    res.status(404).send({ error })
    console.log(error)
  }


})

exports.getFriends = router;