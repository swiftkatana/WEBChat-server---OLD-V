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
  chats: [String],
  connections: { type: {}, default: {} },
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

exports.UpdateFriends = async function (sender, geter) {
  const docSender = await User.findOne({ _id: sender._id })
    .catch((err) => responedList.DBError)
    .then((doc) => doc || responedList.usersNotFound);
  if (docSender.err) {
    res.send(docSender);
  }

  const docGeter = await User.findOne({ _id: geter._id })
    .catch((err) => responedList.DBError)
    .then((doc) => doc || responedList.usersNotFound);
  if (docGeter.err) {
    return docGeter;
  }

  docSender.connections[geter._id] = geter;
  docGeter.connections[sender._id] = sender;
  docGeter.markModified("connections");
  docSender.markModified("connections");
  docGeter.save((err) => {
    if (err) {
      return responedList.FaildSave;
    }

    docSender.save((err) => {
      if (err) {
        return responedList.FaildSave;
      } else {
        return {};
      }
    });
  });
};
