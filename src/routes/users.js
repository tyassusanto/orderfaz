const express = require('express');
const route = express.Router();
const userController = require('../controller/users');
const common = require('../common/helper')

route.post('/register', userController.register) 
route.post('/login', userController.login) 
route.get('/profile', common.auth, userController.profile) 

module.exports = route