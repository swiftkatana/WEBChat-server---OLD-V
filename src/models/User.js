const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String, unique: true },
  admin: { type: Boolean, default: false },
  phone: String,
  address: String,
  imageProfile: { type: String, default: process.env.SERVER_IP + "/profile.png" },
  firstName: { type: String },
  lastName: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  loginAt: { type: Date, default: Date.now },
  chats: { type: {}, default: {} },
  friends: {},
  getFriendRequests: {},
  sendFriendRequests: {},
  blocking: {},
  gotBlock: {}
});
userSchema.method("filterUser", function () {
  let filterUser = { ...this._doc };
  filterUser.password =
    "aGFoYWhhIHlvdSB0aGluayB0aGF0IGlzIHRoZSBwYXNzd29yZCBoYWhhaGFoYWhh ";
  return filterUser;
});

userSchema.statics.getUser = async function (email = 'email of the user', token = 'token of the user') {
  return this.findOne({ email });
}

userSchema.statics.getUsers = async function (ids = []) {
  try {
    if (!ids.length)
      return [];
    return await this.find({ _id: { $in: ids } });
  } catch (error) {
    throw new Error(error);
  }

}

const User = mongoose.model("User", userSchema);

exports.userSchema = userSchema;
exports.User = User;

exports.requestChecker = function (user) {
  const { DOYBC, _id } = user;

  User.findOne({ _id }, (err, user) => {
    if (user) {
      if (user.createDateOfUser === DOYBC) {
        return true;
      }
    }
    return false;
  });
};
