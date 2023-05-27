const connection = require('../config/connection')

const register = (insertDataUser) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users set ?", insertDataUser, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = ?`
        connection.query(query, username, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findMsisdn = (msisdn) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE msisdn = ?`
        connection.query(query, msisdn, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    register,
    findUsername,
    findMsisdn,
}