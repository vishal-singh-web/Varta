const express = require('express');
const {createUser} = require('../controllers/userRoutes')
const Router = express.Router();

Router.post('/register', (req, res, next) => createUser(req, res, next));

module.exports = Router