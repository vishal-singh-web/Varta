const express = require('express');
const Router = express.Router();
const arcjetProtection= require('../middleware/arcjet.mw');
const { searchUser,getUserChat,sendMessage,getAllChatList } = require('../controllers/messageRoutes');
const protectRoute = require('../middleware/auth.mw');

Router.use(arcjetProtection,protectRoute)

Router.get("/search",searchUser);
Router.get('/chats',getAllChatList);
Router.get('/chats/:id',getUserChat);
Router.post('/send/:id',sendMessage);

module.exports = Router