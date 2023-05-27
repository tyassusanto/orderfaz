const connection = require('../config/connection')

const addRoute = (insertRoute) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM logistics WHERE logistic_name = ? AND destination = ? AND origin = ?",
            [insertRoute.logistic_name, insertRoute.destination, insertRoute.origin],
            (error, result) => {
                if (!error) {
                    if (result.length > 0) {
                        reject(new Error('Rute tersebut sudah tersedia'));
                    } else {
                        connection.query("INSERT INTO logistics SET ?", insertRoute, (error, result) => {
                            if (!error) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        });
                    }
                } else {
                    reject(error);
                }
            }
        );
    });
}

module.exports = {
    addRoute
}