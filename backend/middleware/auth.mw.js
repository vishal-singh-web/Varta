const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
require('dotenv').config()

async function protectRoute(req,res,next){
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({success:false,message:"Unauthorized No token"})
        }
        const Verified = jwt.verify(token,process.env.JWT_SECRET);
        if(!Verified){
            res.status(401).json({success:false,message:"Unauthorized Invalid token"})
        }
        const user = await Users.findById(Verified.userId).select("-password");
        if(!user){
            res.status(404).json({success:false,message:"User not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({success:false,message:"User not authorized to do this action."})
    }
}

module.exports = protectRoute;