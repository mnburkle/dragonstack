const pool = require('../../databasePool');
const DragonTable = require('./table');
const Dragon = require('./index');

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        // query that selects the dragon stuff like birthdate
        DragonTable.getDragon({ dragonId }),
        // now get the traits
        new Promise((resolve, reject) => {
            // so this is going to select the trait type and value pairs
            // from the trait table inner joined with dragon trait based on the ids.
            // then we we'll select WHERE dragonTrait.dragonId = dragonId.
            pool.query(
                `SELECT "traitType", "traitValue"
                FROM trait
                INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                WHERE dragonTrait."dragonId" = $1`,
                [dragonId],
                (error, response) => {
                    if(error) return reject(error);
                    // each row is an object of relevant trait type and value combination for this dragon
                    resolve(response.rows);
                }
            );
            // its a little weird to ust return response.rows, without like
            // any identifying thing like the id to help us understand where we're getting
            // this information from, like a sender id type situation, but because
            // promise.all is gonna handle all this stuff in the background
            // it's basically just gonna be okay
        })
    ])
    // so this first argument is the thing that came out of getDragon,
    // and the second one is the thing from the second promise
    // and so now we're going to go ahead and give `dragon` the relevant
    // info since its just like an object with the birthdate and nickname and generationId
    // so we still have to attach that particular dragonId that we passed in for good measure,
    // and then also the traits that we just got.
    .then(([dragon, dragonTraits]) => {
        // before we return, this is just like. sql responses right
        // so we want to actually return an instance of a dragon, not just
        // a json object type situation.

        // we could do someting like this: or we could use the SPREAD function
        // return new Dragon(nickname: dragon.nickname,
        //                  birthdate: dragon.birthdate,
        //                  generationId: dragon.generationId,
        //                  )... etc;

        return new Dragon({...dragon, dragonId, traits: dragonTraits});
    })
    .catch(error => console.error(error));
};

// test with this: if you already have dragons, else need to
// npm run configure-dev then hit localhost:3000/dragon/new
//getDragonWithTraits({dragonId: 1})
//    .then(dragon => console.log("dragon", dragon))
//    .catch(error => console.error('error', error));

module.exports = getDragonWithTraits;