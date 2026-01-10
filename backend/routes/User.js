const express = require('express');
const {createUser,login,logout,updateProfile} = require('../controllers/userRoutes');
const protectRoute = require('../middleware/auth.mw');
const arcjetProtection= require('../middleware/arcjet.mw');
const Router = express.Router();

Router.use(arcjetProtection)

Router.post('/register', createUser);
Router.post('/login', login);
Router.post('/logout', logout);

Router.put('/update-profile',protectRoute,updateProfile)
Router.get('/checkUser',protectRoute,(req,res)=>res.status(200).json({success:true,message:"User is authenticated",data:req.user}))
module.exports = Router