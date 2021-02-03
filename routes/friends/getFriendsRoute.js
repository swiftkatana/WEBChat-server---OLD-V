const express = require('express');
const { User } = require('../../models/User');
const { responedList } = require('../../respondList');

const router = express.Router();



router.post('/getFriends', async (req, res) => {
  try {

    const { _id, createAt } = req.body;

    const user = User.findOne({ _id, createAt });

    if (!user) {
      res.status(404).send(responedList.infoInvalid);
      return;
    }
    let _ids = [];

    for (let user of user.connections)
      if (user.status === 'accept')
        ids.push(user._id);

    const usersFilter = await User.find({ _id: { $in: _ids } })

    res.send({ friends: usersFilter || [] });

  } catch (error) {
    res.status(404).send({ error })
    console.log(error)
  }


})

exports.getFriends = router;