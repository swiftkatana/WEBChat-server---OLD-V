const mongoose = require("mongoose");
const { userSchema } = require("./User");
const { chatMessageSchima } = require("./ChatMeassge");
const { responedList } = require("../respondList");

const ChatSchima = mongoose.Schema({
  name: { type: String },
  users: { type: { userSchema }, default: {} },
  messages: { type: [chatMessageSchima], default: [] },
  type: String,
  img: { type: String, default: "http://84.108.78.137:1029/chatImg.png" },
});

const Chat = mongoose.model("Chats", ChatSchima);

exports.ChatSchima = ChatSchima;
exports.Chat = Chat;

exports.CreateChat = CreateChat = (users, type, chatName) => {
  if (!chatName) chatName = "Change the Chat defualt name";
  const userObg = {};
  users.forEach((user) => {
    userObg[user._id] = user;
  });
  const newChat = new Chat({
    name: chatName,
    users: userObg,
    type: type,
  });
  newChat.save((err) => {
    if (err) {
      return responedList.FaildSave;
    }
  });

  return { _id: newChat._id };
};

exports.addMessageToAChat = (message) => {
  Chat.findById(message.chatId, (err, chat) => {
    chat.messages.push(message);
    chat.markModified("messages");
    chat.save((err) => {
      if (err) {
        console.log("error cant save message");
      }
    });
  });
};
