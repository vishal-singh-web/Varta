const { sendWelcomeEmail } = require('../emails/emailHandler');
const { generateToken } = require('../lib/utils');

const User = require('../models/Users');
const { compare } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const createUser = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            const error = new Error("All fields are required")
            return next(error)
        }
        const findEmail = await User.findOne({ email })
        if (findEmail) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exist"
            })
        }
        const findUserName = await User.findOne({ username })
        if (findUserName) {
            return res.status(409).json({
                success: false,
                message: "User with this username already exist"
            })
        }
        if(password<6){
            return res.status(409).json({
                success: false,
                message: "Password must be atleast 6 characters"
            })
        }
        await sendWelcomeEmail(email, username, process.env.actionURL, next);
        const newUser = await User.create({
            username,
            email,
            password,
            role
        })
        await generateToken(newUser._id, res);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {"email":newUser.email,"username":newUser.username,"profilePic":newUser.profilePic}
        })
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    const { username, email, password, role } = req.body;
    try {
        if ((!username && !email) || !password) {
            const error = new Error("All fields are required")
            error.statusCode = 400;
            return next(error)
        }
        let findUser = null;
        if (username) {
            findUser = await User.findOne({ username }).select("+password");
            if (!findUser) {
                const error = new Error("Invalid Credentials")
                error.statusCode = 400;
                return next(error)
            }

        }
        else if (email) {
            findUser = await User.findOne({ email }).select("+password");
            if (!findUser) {
                const error = new Error("Invalid Credentails")
                error.statusCode = 400;
                return next(error)
            }
        }
        const checkPass = await compare(password, findUser.password);
        if (!checkPass) {
            error = new Error("Invalid Credentails")
            error.statusCode = 400;
            return next(error)
        }
        await generateToken(findUser._id, res);
        res.status(200).json({
            success: true,
            message: "User login successfully",
            data:{"email":findUser.email,"username":findUser.username,"profilePic":findUser.profilePic}
        })
    } catch (error) {
        next(error)
    }
}
function logout(req, res, next) {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        success: true,
        message: "User Logout successfull"
    })
}
async function updateProfile(req,res,next){
    try {
        const {profilePic} = req.body;
        if(!profilePic) return res.status(404).json({success:false,message:"Profile pic is required"});
        const userId = req.user._id;
        const uploadRes = await cloudinary.uploader.upload(profilePic);
        const updated = await User.findByIdAndUpdate(userId,{profilePic:uploadRes.secure_url},{new:true});
        res.status(200).json({
            success:true,
            message:"User profile updated successfully",
            data:updated
        });
    } catch (error) {
        next(error)
    }
}
module.exports = { createUser, login, logout, updateProfile }