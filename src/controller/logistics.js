const { v4: uuid } = require('uuid');
const createError = require('http-errors');
const commonHelper = require('../common/helper')

const modelLogistics = require('../models/logistics')

const addRoute = async (req, res, next) => {
    try {
        const { logistic_name, amount, destination, origin, duration } = req.body;
        const data = {
            id_logistics: uuid(),
            logistic_name,
            amount,
            destination,
            origin,
            duration
        };
        const result = await modelLogistics.addRoute(data)
        res.status(200)
        commonHelper.response(res, data, 200, `berhasil menambhakan rute baru dari ${origin} ke ${destination} dengan ekspedisi ${logistic_name}`)
    } catch (error) {
        console.log(error, 'error post')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}



module.exports = {
    addRoute
}