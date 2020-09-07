const pool = require('../../databasePool');
const TraitTable = require('../trait/table.js');

class DragonTraitTable {
    static storeDragonTrait({ dragonId, traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            TraitTable.getTraitId({ traitType, traitValue })
                .then(({ traitId }) => {
                    pool.query(
                        `INSERT INTO dragonTrait("traitId", "dragonId")
                        VALUES($1, $2)`,
                        [traitId, dragonId],
                        (error, response) => {
                            if (error) return reject(error);
                            // id created by postgre sql
                            resolve();
                        });
                })
                .catch(error => {
                    console.error(error);
                });
        });
//        TraitTable.getTraitId({ traitType, traitValue })
//            .then(({ traitId }) => {
//                console.log('trait id', traitId);
//                return new Promise((resolve, reject) => {
//                pool.query(
//                    `INSERT INTO dragonTrait("traitId", "dragonId")
//                    VALUES($1, $2)
//                    RETURNING id`,
//                    [traitId, dragonId],
//                    (error, response) => {
//                        if (error) return reject(error);
//                        // id created by postgre sql
//                        const traitId = response.rows[0].id;
//                        resolve({ traitId });
//                    });
//                });
//            })
//            .catch(error => {
//                console.error(error);
//                next(error);
//            });
    }
}

module.exports = DragonTraitTable;