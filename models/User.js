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
    imageProfile:{type:String,default:'http://84.108.77.60:1029/profile.png'},
    chats:[String],
    connections:{type:{},default:{}},
});
exports.userSchema = userSchema; 
const User = mongoose.model("User", userSchema);

exports.User = User;


exports.requestChecker= function(user){
const {DOYBC,_id}= user;

User.findOne({_id},(err,user)=>{
        if(user){
            if(user.createDateOfUser===DOYBC){
                return true
            }
        }
        return false;


})



}