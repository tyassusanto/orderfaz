const express = require('express');
const route = express.Router();
const userController = require('../controller/users');
const common = require('../common/helper')

route.post('/register', userController.register) // done
route.post('/login', userController.login) // done
route.get('/profile', common.auth, userController.profile) // done

module.exports = route