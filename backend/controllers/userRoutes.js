const User = require('../models/Users');
const { compare } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

async function createUser(req, res, next) {
    try {
        const findEmail = await User.findOne({ emai: req.body.email })
        if (findEmail) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exits"
            })
        }
        const findUserName = await User.findOne({ username: req.body.username })
        if (findUserName) {
            return res.status(409).json({
                success: false,
                message: "User with this username already exits"
            })
        }
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        const token = sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
            token: token
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { createUser }