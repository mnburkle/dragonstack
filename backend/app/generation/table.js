const pool = require('../../databasePool');

class GenerationTable {
    // class is acting like a namespace to scope out generation table related functions
    static storeGeneration(generation) {
        return new Promise((resolve, reject) => {
            // insert data using syntax that node postgres recognizes
            // also lol that its 1-indexed
            pool.query('INSERT INTO generation(expiration) VALUES($1) RETURNING id',
            [generation.expiration], (error, response) => {
                if (error) return reject(error);
                // id created by postgre sql
                const generationId = response.rows[0].id;

                resolve({ generationId });
            });
        });
    }
}

module.exports = GenerationTable;