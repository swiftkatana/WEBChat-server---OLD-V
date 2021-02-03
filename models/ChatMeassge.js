const mongoose = require('mongoose');



const chatMessageSchima = mongoose.Schema({
    message: String,
    senderId: String,
    senderName: String,
    chatId: String,
    createTime: {}
})
const ChatMessageDB = mongoose.model('ChatMessage', chatMessageSchima);
exports.chatMessageSchima = chatMessageSchima;
exports.ChatMessageDB = ChatMessageDB



exports.createNewMessage = async (message) => {
    try {
        let message = new ChatMessageDB({ ...message });
        await message.save()

        return { message };

    } catch (error) {

        throw error;

    }


};

