const mongoose = require('mongoose');



const chatMessageSchima= mongoose.Schema({
    message:String,
    senderId:String,
    senderName:String,
    chatId:String,
    createTime:{}
})
exports.chatMessageSchima = chatMessageSchima;


exports.ChatMessage = mongoose.model('ChatMessage',chatMessageSchima)