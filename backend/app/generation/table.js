const pool = require('../../databasePool');

class GenerationTable {
    // class is acting like a namespace to scope out generation table related functions
    static storeGeneration(generation) {
    
        // insert data using syntax that node postgres recognizes
        // also lol that its 1-indexed
        pool.query('INSERT INTO generation(expiration) VALUES($1) RETURNING id',
        [generation.expiration], (error, response) => {
            if (error) return console.error(error);
            // id created by postgre sql
            const generationId = response.rows[0].id;

        });
    }
}

module.exports = GenerationTable;