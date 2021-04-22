const mongoose = require("mongoose");

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
      let chat = await Chat.findOne({ type: 'friends', users: { $in: [users[0]._id, users[1]._id] } });
      if (chat) {
        console.log('old chat');
        return chat;
      } else
        console.log('didnt find')
    }

    let spyCode = Date.now().toString();
    let todayDate = Date.now();
    const newChat = new Chat({
      name: chatName,
      users,
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

