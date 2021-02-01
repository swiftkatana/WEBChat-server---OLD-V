const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  admin: {
    type: Boolean,
    default: false,
  },
  createDateOfUser: { type: Date, default: Date.now },
  firstName: { type: String },
  lastName: { type: String },
  phone: String,
  address: String,
  imageProfile: {
    type: String,
    default: process.env.SERVER_IP + "/profile.png",
  },
  chats: { type: {}, default: {} },
  connections: { type: {}, default: {} },
});
userSchema.method("filterUser", function () {
  let filterUser = { ...this._doc };
  filterUser.password =
    "aGFoYWhhIHlvdSB0aGluayB0aGF0IGlzIHRoZSBwYXNzd29yZCBoYWhhaGFoYWhh ";
  return filterUser;
});
exports.userSchema = userSchema;
const User = mongoose.model("User", userSchema);

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
