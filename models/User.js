const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{type:String,},
    password:{type:String,},
    admin:{
        type:Boolean,
        default:false,
    },
    createDateOfUser:{ type:Date,default:Date.now},
    firstName:{type:String,},
    lastName:{type:String,},
    phone:String,
    address:String,
    imageProfile:{type:String,default:'http://84.108.78.137:1029/profile.png'},
    chats:[String],
    friends:{type:{},default:{}},
});
exports.userSchema = userSchema; 
const User = mongoose.model("User", userSchema);

exports.User = User;


