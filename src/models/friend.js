const mongoose = require('mongoose');

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
    console.trace("dont need to do anything");
    return
  }
  if (this.blocking) {
    console.trace("error with the logic or the request");
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
  this.lastUpdated = new Date();
  //---------------------
  this.save();
});


friendSchema.method("acceptReq", function (userId = mongoose.Schema.Types.ObjectId) {
  // check for end case
  //-----------------------
  if (this.friend) {
    console.trace("dont need to do anything");
    return
  }

  if (this.delete || !this.pending || this.friend || (this.blocking && userId !== this.lastUserId)) {
    console.trace("error with the logic or the request");
    return
  }

  //-----------------------
  // change values
  this.pending = false;
  this.friend = true;
  this.blocking = false;
  this.delete = false;

  this.lastUserId = userId;
  this.lastUpdated = new Date();
  //---------------------
  this.save();
});



friendSchema.method("blockfriend", function (userId = mongoose.Schema.Types.ObjectId) {
  // check for end case
  //-----------------------
  if (this.blocking) {
    console.trace("dont need to do anything");
    return;
  }
  if (this.delete) {
    console.trace("error with the logic or the request");
    return;
  }
  //-----------------------
  // change values
  this.pending = false;
  this.friend = false;
  this.blocking = true;
  this.delete = false;

  this.lastUserId = userId;
  this.lastUpdated = new Date();
  //---------------------
  this.save();
});



friendSchema.method("deletefriend", function (userId = mongoose.Schema.Types.ObjectId) {
  // check for end case
  //-----------------------
  if (this.delete) {
    console.trace("dont need to do anything");
    return;
  }
  if (this.blocking && this.lastUserId !== userId) {
    console.trace("error with the logic or the request");
    return;
  }
  //-----------------------
  // change values
  this.pending = false;
  this.friend = false;
  this.blocking = false;
  this.delete = true;

  this.lastUserId = userId;
  this.lastUpdated = new Date();
  //---------------------
  this.save();
});

friendSchema.statics.getConnections = async function (userId) {
  const filterUsersFriends = {
    $or: [{ user1: userId }, { user2: userId },],
    friend: true,
  }
  const filterUsersPendingGet = {
    $or: [{ user1: userId }, { user2: userId },],
    $ne: { lastUserId: userId },
    pending: true,

  }
  const filterUsersPendingSend = {
    $or: [{ user1: userId }, { user2: userId },],
    $eq: { lastUserId: userId },
    pending: true,

  }
  const filterUsersblock = {
    $or: [{ user1: userId }, { user2: userId },],
    blocking: true,
    lastUserId: userId,
  }

  let friends = await this.model.find(filterUsersFriends);
  let pendingGet = await this.model.find(filterUsersPendingGet);
  let pendingSend = await this.model.find(filterUsersPendingSend);
  let blocking = await this.model.find(filterUsersblock);

  return { friends, pendingGet, pendingSend, blocking }

}
friendSchema.statics.createFriendShip = async function (userId1, userId2, chatId) {
  let friendShip = await this.model.findOne({ $and: [{ user1: userId1 }, { user2: userId2 },] })
  if (friendShip)
    return friendShip
  else {
    let friendShip = await this.model.findOne({ $and: [{ user2: userId1 }, { user1: userId2 },] })
    if (friendShip)
      return friendShip
  }



  return new this.model({
    user1: userId1,
    user2: userId2,
    chatId: chatId,
    lastUpdated: { type: Date, default: Date.now },
    createAt: { type: Date, default: Date.now },
    delete: false,
    pending: false,
    friend: false,
    blocking: false,
  });



}
const FriendDB = mongoose.model('Friends', friendSchema);

exports.FriendDB = FriendDB;
exports.friendSchema = friendSchema;
