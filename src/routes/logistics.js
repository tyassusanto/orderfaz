const express = require('express');
const route = express.Router();
const logisticsController = require('../controller/logistics');
const common = require('../common/helper')

route.post('/addroute', common.auth, logisticsController.addRoute) // done
route.get('/', common.auth, logisticsController.searchRoute) // done
route.delete('/delete/:id', common.auth, logisticsController.deleteRoute) //done
route.put('/update/:id', common.auth, logisticsController.updateRoute)

module.exports = route