const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const commonHelper = require('../common/helper')

const modelUsers = require('../models/users')

const register = async (req, res, next) => {
    try {
        const { username, password, name, msisdn } = req.body;
        const msisdnRegex = /^62\d+$/;
        if (!msisdn.match(msisdnRegex)) {
            return next(createError(400, 'Nomor harus berawalan 62 dan hanya boleh diisikan angka'));
        }
        const userUsername = await modelUsers.findUsername(username);
        const userMsisdn = await modelUsers.findMsisdn(msisdn);
        if (userUsername.length > 0) {
            return next(createError(403, 'Username sudah terdaftar'))
        };
        if (userMsisdn.length > 0) {
            return next(createError(403, 'Nomor sudah terdaftar'))
        };
        const hashPassword = await bcrypt.hash(password, 10);
        const insertDataUser = {
            id: uuid(),
            username,
            password: hashPassword,
            name,
            msisdn
        };
        const resultRegister = await modelUsers.register(insertDataUser);
        const result = {
            username,
            name,
            phone: msisdn
        }
        res.status(200)
        commonHelper.response(res, result, 200, 'berhasil register');
    } catch (error) {
        console.log(error);
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            });
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const [user] = await modelUsers.findUsername(username)
        if (!user) return next(createError(403, 'Username salah atau belum terdaftar'))
        const hashedPassword = await bcrypt.compare(password, user.password)
        if (!hashedPassword) return next(createError(403, 'Password salah'))
        const secretKey = process.env.SECRET_KEY_JWT
        const payload = {
            username: user.username,
            name: user.name,
            phone: user.msisdn
        }
        const verifToken = {
            expiresIn: 60 * 60 //1jam
        }
        const token = jwt.sign(payload, secretKey, verifToken)
        user.token = token
        const result = {
            username: user.username,
            name: user.name,
            phone: user.msisdn,
            token
        }
        res.status(200)
        commonHelper.response(res, result, 200, 'berhasil login');

    } catch (error) {
        res.status(500)
    }
}

const profile = async (req, res, next) => {
    try {
        const username = req.username;
        const [user] = await modelUsers.findUsername(username);
        const result = {
            username : user.username,
            name : user.username,
            phone : user.msisdn
        }
        commonHelper.response(res, result, 200);
    } catch (error) {
        res.status(500)
        next(error)
    }
};

module.exports = {
    register,
    login,
    profile
}