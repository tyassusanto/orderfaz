const express = require('express');
const route = express.Router();
const logisticsController = require('../controller/logistics');
const common = require('../common/helper')

route.post('/addroute', common.auth, logisticsController.addRoute) // done
route.get('/', common.auth, logisticsController.searchRoute) // done

module.exports = route