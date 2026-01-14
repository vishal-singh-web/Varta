const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
require('dotenv').config()

async function protectRoute(req,res,next){
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized No token"})
        }
        const Verified = jwt.verify(token,process.env.JWT_SECRET);
        if(!Verified){
            return res.status(401).json({success:false,message:"Unauthorized Invalid token"})
        }
        const user = await Users.findById(Verified.userId).select("-password");
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = protectRoute;