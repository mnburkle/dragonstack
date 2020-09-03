const pool = require('../../databasePool');

class DragonTable {
    // class is acting like a namespace to scope out generation table related functions
    static storeDragon(dragon) {
        const { birthdate, nickname, generationId } = dragon;
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO dragon(birthdate, nickname, "generationId")
                VALUES($1, $2, $3)
                RETURNING id`,
                [dragon.birthdate, dragon.nickname, dragon.generationId],
                (error, response) => {
                    if (error) return reject(error);
                    // id created by postgre sql
                    const dragonId = response.rows[0].id;
                    resolve({ dragonId });
            });
        });
    }
}

module.exports = DragonTable;