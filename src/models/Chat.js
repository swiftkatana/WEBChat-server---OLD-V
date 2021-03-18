const mongoose = require("mongoose");
const { userSchema } = require("./User");

const ChatSchima = mongoose.Schema({
  name: { type: String },
  users: { type: [], default: [] },
  messages: { type: [], default: [] },
  createAt: { type: Number },
  updateAt: { type: Number },
  spyCode: { type: String },
  type: String,
  img: { type: String, default: "http://84.108.78.137:1029/chatImg.png" },
});

const Chat = mongoose.model("Chats", ChatSchima);

exports.ChatSchima = ChatSchima;
exports.Chat = Chat;

exports.CreateChat = CreateChat = async (users = [], type = 'friends', chatName = "friendsChat!") => {
  try {
    if (type === 'friends') {
      let chat = Chat.findOne({ type: 'friends', users: [users[0]._id, users[1]._id] });
      if (chat) {

        return chat;
      }
    }

    const userObg = {};
    let spyCode = Date.now().toString();
    users.forEach((user, i) => {
      spyCode.replace(`${i}`, user.firstName);
      userObg[user._id] = user;
    });
    let todayDate = Date.now();
    const newChat = new Chat({
      name: chatName,
      users: userObg,
      createAt: todayDate,
      updateAt: todayDate,
      type: type,
      spyCode,
    });
    await newChat.save()

    return { _id: newChat._id, type };

  } catch (error) {
    throw error
  }

};

