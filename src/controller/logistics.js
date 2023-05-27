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

const searchRoute = async (req, res, next) => {
    try {
        const searchDestination = req.query.destination;
        const searchOrigin = req.query.origin;
        const sort = req.query.sort || 'destination';
        const order = req.query.order || 'DESC';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const offset = (page - 1) * limit;

        const resProduct = await modelLogistics.searchRoute({
            searchDestination,
            searchOrigin,
            sort,
            order,
            offset,
            limit
        })
        const totalCount = await modelLogistics.countRoutes()
        const [{ total }] = totalCount
        res.status(200)
        commonHelper.response(res, resProduct, 200, null, {
            currentPage: page,
            limitData: limit,
            totalData: total,
            totalPage: Math.ceil(total / limit)
        })
    } catch (error) {
        console.log(error, 'error get')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}



module.exports = {
    addRoute,
    searchRoute
}