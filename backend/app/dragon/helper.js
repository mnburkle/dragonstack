const pool = require('../../databasePool');
const DragonTable = require('./table');

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        // pool that selects the dragon stuff like birthdate
        DragonTable.getDragon({ dragonId });
    ]);
};