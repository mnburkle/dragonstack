const pool = require('../../databasePool');

class DragonTable {
    // class is acting like a namespace to scope out generation table related functions
    static storeDragon(dragon) {
        return new Promise((resolve, reject) => {
            // insert data using syntax that node postgres recognizes
            // also lol that its 1-indexed
            pool.query('INSERT INTO dragon(birthdate) VALUES($1) RETURNING id',
            [dragon.birthdate], (error, response) => {
                if (error) return reject(error);
                // id created by postgre sql
                const dragonId = response.rows[0].id;

                resolve({ dragonId });
            });
        });
    }
}

module.exports = DragonTable;