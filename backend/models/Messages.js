const mongoose = require('mongoose');

const messageScheme = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },
    text:{
        type:String,
        trim:true,
        maxlength:2000
    },
    image:{
        type:String
    }
}, 
{timestamps: true})

module.exports = mongoose.model('Message',messageScheme);