
module.exports = function(app,io){
const {Chat,CreateChat} = require('../models/Chat');
const {User} = require('../models/User');

        app.post('/getChat',(req,res)=>{
        console.log('get chat')
        const chatid = req.body.chatId;
        console.log(req.body)
        Chat.findOne({_id:chatid},(err,chat)=>{
            if(err){
                console.log(err)
            }else{
                if(chat){
                    res.send(chat);
                }else{
                    console.log('chat not found')
                }

            }
        })
    })




    app.post('/createchat', async(req,res)=>{
        const {users,type,chatName} = req.body;

        const data = await  CreateChat(users,type,chatName);

        if(data.err){
            console.log(data.err)
            res.send(data.err);
        }else{
            res.send(data.id);
        }


    });


}