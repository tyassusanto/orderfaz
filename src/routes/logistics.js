const express = require('express');
const route = express.Router();
const logisticsController = require('../controller/logistics');
const common = require('../common/helper')

route.post('/addroute', logisticsController.addRoute) // done

module.exports = route