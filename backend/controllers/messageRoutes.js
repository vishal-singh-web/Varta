const Users = require("../models/Users");
const Messages = require("../models/Messages");
const { getRecieverSocketId, io } = require("../lib/socket");
const cloudinary = require('cloudinary').v2;

async function searchUser(req, res, next) {
    try {
        const username = req.query.q;
        const UserId = req.user._id;
        const users = await Users.find({
            _id: { $ne: UserId },
            username: { $regex: `^${username}`, $options: "i" }
        }).limit(10);
        if (users.length==0){
            return res.status(404).json({success:false,message:"Username not found"});
        }
        res.status(200).json({
            success:true,
            message:"Usernames fetched",
            data:users
        })
    } catch (error) {
        next(error)
    }
}
async function getUserChat(req,res,next){
    try {
        const urlId = req.params.id;
        const myId = req.user._id;
        const msgs = await Messages.find({
            $or:[
                {senderId:myId, receiverId:urlId},
                {senderId:urlId, receiverId:myId}
            ]
        })
        if(msgs.length==0){
            return res.status(404).json({success:false,meesage:"No messages"})
        }
        res.status(200).json({success:true,message:"Messages fetched",data:msgs})
    } catch (error) {
        next(error)
    }
}
async function sendMessage(req,res,next){
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let imageURL;
        if(image){
            const uploadRes = await cloudinary.uploader.upload(image);
            imageURL = uploadRes.secure_url;
        }
        const newMsg = new Messages({
            senderId,
            receiverId,
            text,
            image:imageURL
        })
        await newMsg.save();
        //todo: send msg in real-time if user is online -socker.io
        const recieverSocketId = getRecieverSocketId(receiverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMsg)
        }
        res.status(200).json({success:true,message:"Message sent.",data:newMsg})
    } catch (error) {
        next(error)
    }
}
async function getAllChatList(req,res,next){
    try {
        const myId = req.user._id;
        const msgs = await Messages.find({
            $or:[
                {senderId:myId},
                {receiverId:myId}
            ]
        })
        const chatlist =[...new Set(msgs.map(msg=>{
            return msg.senderId.toString()===myId.toString()?msg.receiverId.toString():msg.senderId.toString()
        }))]
        const users = await Users.find({_id:{$in:chatlist}});
        res.status(200).json({success:true,message:"chatlist fetched",data:users})
    } catch (error) {
        next(error)
    }
}

module.exports = { searchUser,getUserChat,sendMessage,getAllChatList };