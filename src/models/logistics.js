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

const searchRoute = ({ searchDestination, searchOrigin, sort, order, limit, offset }) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM logistics';

        if (searchOrigin && !searchDestination) {
            query += ` WHERE origin LIKE '%${searchOrigin}%'`;
        }

        if (!searchOrigin && searchDestination) {
            query += ` WHERE destination LIKE '%${searchDestination}%'`;
        }

        if (searchOrigin && searchDestination) {
            query += ` WHERE origin LIKE '%${searchOrigin}%' AND destination LIKE '%${searchDestination}%'`;
        }

        query += ` ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`;

        // console.log('query: ', query);

        connection.query(query, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
}

const countRoutes = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) AS total FROM logistics', (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const deleteRoute = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM logistics WHERE id_logistics = ?';
        connection.query(query, id, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const updateRoute = (updatedRoute, id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM logistics WHERE logistic_name = ? AND destination = ? AND origin = ?",
            [updatedRoute.logistic_name, updatedRoute.destination, updatedRoute.origin],
            (error, result) => {
                if (!error) {
                    if (result.length > 0) {
                        reject(new Error('Rute tersebut sudah tersedia'));
                    } else {
                        connection.query(
                            "UPDATE logistics SET ? WHERE id_logistics = ?",
                            [updatedRoute, id],
                            (error, result) => {
                                if (!error) {
                                    resolve(result);
                                } else {
                                    reject(error);
                                }
                            }
                        );
                    }
                } else {
                    reject(error);
                }
            }
        );
    });
};

module.exports = {
    addRoute,
    searchRoute,
    countRoutes,
    deleteRoute,
    updateRoute
}