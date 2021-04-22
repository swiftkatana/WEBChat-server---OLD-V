const mongoose = require('mongoose');
const { User } = require('./User');

const friendSchema = mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  lastUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastUpdated: { type: Date, default: Date.now },
  createAt: { type: Date, default: Date.now },
  delete: { type: Boolean, default: false },
  pending: { type: Boolean, default: true },
  friend: { type: Boolean, default: false },
  blocking: { type: Boolean, default: false },
});

friendSchema.method("sendReq", function (userId = mongoose.Schema.Types.ObjectId) {
  // check for end case
  //-----------------------
  if (this.pending || this.friend) {
    console.log("dont need to do anything");
    return
  }
  if (this.blocking) {
    console.log("error with the logic or the request");
    return
  }
  //-----------------------
  // make user one the one who start this friend ship 
  this.user2 === userId ? this.user2 = this.user1 : null
  this.user1 = userId;



  // change values
  this.pending = true;
  this.friend = false;
  this.blocking = false;
  this.delete = false;

  this.lastUserId = userId;
  this.lastUpdated = Date.now();
  //---------------------
  this.save();
});

friendSchema.method("acceptReq", function (userId = mongoose.Schema.Types.ObjectId) {
  // check for end case
  //-----------------------
  if (this.friend) {
    console.log("dont need to do anything");
    return
  }

  if (this.delete || !this.pending || this.friend || (this.blocking && userId !== this.lastUserId)) {
    console.log("error with the logic or the request");
    return
  }

  //-----------------------
  // change values
  this.pending = false;
  this.friend = true;
  this.blocking = false;
  this.delete = false;

  this.lastUserId = userId;
  this.lastUpdated = Date.now();
  //---------------------
  this.save();
});

friendSchema.method("blockfriend", function (userId = mongoose.Schema.Types.ObjectId) {
  // check for end case
  //-----------------------
  if (this.blocking) {
    console.log("dont need to do anything");
    return;
  }
  if (this.delete) {
    console.log("error with the logic or the request");
    return;
  }
  //-----------------------
  // change values
  this.pending = false;
  this.friend = false;
  this.blocking = true;
  this.delete = false;

  this.lastUserId = userId;
  this.lastUpdated = Date.now();
  //---------------------
  this.save();
});

friendSchema.method("deletefriend", function (userId = mongoose.Schema.Types.ObjectId) {
  // check for end case
  //-----------------------
  if (this.delete) {
    console.log("dont need to do anything");
    return;
  }
  if (this.blocking && this.lastUserId !== userId) {
    console.log("error with the logic or the request");
    return;
  }
  //-----------------------
  // change values
  this.pending = false;
  this.friend = false;
  this.blocking = false;
  this.delete = true;

  this.lastUserId = userId;
  this.lastUpdated = Date.now();
  //---------------------
  this.save();
});

friendSchema.statics.getConnections = async function (userId) {
  try {

    const filterUsersFriends = {
      $or: [{ user1: userId }, { user2: userId },],
      friend: true,
    }
    const filterUsersPendingGet = {
      $or: [{ user1: userId }, { user2: userId },],
      lastUserId: { $ne: userId },
      pending: true,

    }
    const filterUsersPendingSend = {
      $or: [{ user1: userId }, { user2: userId },],
      lastUserId: { $eq: userId },
      pending: true,

    }
    const filterUsersblock = {
      $or: [{ user1: userId }, { user2: userId },],
      blocking: true,
      lastUserId: userId,
    }


    let friends = getIdOfMyFriend(userId, await this.find(filterUsersFriends))
    let users1 = User.getUsers(Object.keys(friends))
    if (users1.length > 0)
      users1.forEach(user => {
        friends[user._id] = user
      })

    let pendingGet = getIdOfMyFriend(userId, await this.find(filterUsersPendingGet))
    let users2 = User.getUsers(Object.keys(pendingGet))
    if (users2.length > 0)
      users2.forEach(user => {
        pendingGet[user._id] = user
      })

    let pendingSend = getIdOfMyFriend(userId, await this.find(filterUsersPendingSend))
    let users3 = User.getUsers(Object.keys(pendingSend))
    if (users3.length > 0)
      users3.forEach(user => {
        pendingSend[user._id] = user
      })

    let blocking = getIdOfMyFriend(userId, await this.find(filterUsersblock))
    let users4 = User.getUsers(Object.keys(blocking))
    if (users4.length > 0)
      users4.forEach(user => {
        blocking[user._id] = user
      })


    return { friends, pendingGet, pendingSend, blocking }
  } catch (error) {
    console.log(error)
  }

}

friendSchema.statics.createFriendShip = async function (userId1, userId2, chatId) {
  let friendShip = await this.findOne({ $and: [{ user1: userId1 }, { user2: userId2 },] })
  if (friendShip)
    return friendShip
  else {
    let friendShip = await this.findOne({ $and: [{ user2: userId1 }, { user1: userId2 },] })
    if (friendShip)
      return friendShip
  }



  return new this({
    user1: userId1,
    user2: userId2,
    chatId: chatId,
    delete: false,
    pending: false,
    friend: false,
    blocking: false,
  });



}

friendSchema.statics.getAllMyFriendsIds = async function (_id = mongoose.Schema.Types.ObjectId, withMine = false) {
  let users1 = await this.find({ user2: _id }, { _id: 1 })
  let users2 = await this.find({ user1: _id }, { _id: 1 })


  return withMine ? [_id, ...users1, ...users2] : [...users1, ...users2]
}




const FriendDB = mongoose.model('Friends', friendSchema);

exports.FriendDB = FriendDB;
exports.friendSchema = friendSchema;


const getIdOfMyFriend = (userId = mongoose.Schema.Types.ObjectId, friendsShip = []) => {
  let obj = {};
  for (let friend in friendsShip) {
    friend.user1 === userId ?
      obj[friend.user2] = { chatId: friend.chatId } :
      obj[friend.user1] = { chatId: friend.chatId }
  }
  return obj;
}