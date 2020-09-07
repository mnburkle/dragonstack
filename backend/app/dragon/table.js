const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');

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

                    Promise.all(dragon.traits.map(trait => {
                        const traitType = trait.type;
                        const traitValue = trait.value;
                        return DragonTraitTable.storeDragonTrait({ dragonId, traitType, traitValue });
                    }))
                    .then(() => {
                        resolve({ dragonId });
                    })
                    .catch(error => {
                        reject(error);
                    });
                }
            );
        });
    }

    static getDragon({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT birthdate, nickname, "generationId"
                 FROM dragon
                 WHERE dragon.id = $1`,
                [dragonId],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    if(response.rows.length == 0) {
                        return reject(new Error('No dragon'));
                    }
                    resolve(response.rows[0]);
                }
            );
        });
    }
}

// can check with:
//DragonTable.getDragon({dragonId: 1})
//    .then(dragon => console.log(dragon))
//    .catch(error => console.error("error", error));

module.exports = DragonTable;