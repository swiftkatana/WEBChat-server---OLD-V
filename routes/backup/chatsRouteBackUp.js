const express = require("express");
const { Chat, CreateChat } = require("../../models/Chat");
const { User } = require("../../models/User");
const { responedList } = require("../../respondList");
const router = express.Router();
router.post("/getChat", (req, res) => {
  const { chatId } = req.body;
  Chat.findOne({ _id: chatId }, (err, chat) => {
    if (err) {
      console.log(err);
    } else {
      if (chat) {
        res.send(chat);
      } else {
        console.log("chat not found");
      }
    }
  });
});

router.post("/getchats", async (req, res) => {
  const { ids } = req.body;

  if (!ids) {
    res.send(responedList.infoInvalid);
    return;
  }
  let chats = await Chat.find({ _id: { $in: Object.keys(ids) } })
    .catch((err) => responedList.DBError)
    .then((docs) => docs || responedList.NotExists);
  if (chats.err) {
    res.send(chats);
    return;
  }
  res.send(chats);
});

router.post("/addpepole", (req, res) => {
  // you need to send to here the chat id and users in array
  const { users, chatId } = req.body;
  const usersObj = {};
  let good = true;
  let error = "";
  let ids = [];
  users.forEach((user) => {
    usersObj[user._id] = user;
    ids.push(user._id);
  });
  Chat.findOne({ _id: chatId }, (err, chat) => {
    if (!chat || err) {
      console.log(err + " \r\n someone try to add to a chat  but not working");
      error = "didnt add friends try again";
      good = false;
    } else {
      if (chat.type === "group") {
        // if the chat type is group you can add friends to the chat  so first its will find the users update it that thay have new chat and then add to the chat
        chat.users = { ...chat.users, ...usersObj };
        User.find({ _id: { $in: ids } }, (err, users) => {
          if (!users || err) {
            console.log(err + " \r\n or not founds users to add the chat id");
            error = "didnt add friends try again";
            good = false;
          } else {
            users.forEach((user) => {
              user.chats.push(chatId);
              user.markModified("chats");
              user.save((err) => {
                if (err) {
                  console.log(
                    err + " \r\n someone try to add to a chat  but not working"
                  );
                  error = "didnt add friends try again";
                  good = false;
                  return;
                }
              });
            });
            chat.markModified("users");
            chat.save((err) => {
              if (err) {
                console.log(
                  err + " \r\n someone try to add to a chat  but not working"
                );
                error = "didnt add friends try again";
                good = false;
                return;
              }
            });
          }
        });
      } else {
        error = "you cant add pepole to a friend chat only group chat";
        console.log("someone try to add friends to friend chat  ");
        good = false;
      }
    }

    if (good) {
      users.forEach((user) => {
        req.io.emit("inviteToGroupChat" + user._id, chat);
      });
    } else {
      users.forEach((user) => {
        req.io.emit("error" + user._id, error);
      });
    }
  });
});

router.post("/createchat", async (req, res) => {
  const { users, type, chatName } = req.body;

  const data = await CreateChat(users, type, chatName);

  if (data.err) {
    res.send(data.err);
  } else {
    res.send(data.id);
  }
});
module.exports = router;
