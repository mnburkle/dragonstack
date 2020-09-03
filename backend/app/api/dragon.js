const { Router } = require('express'); // router class is not root export so have to require it within curly braces
const DragonTable = require('../dragon/table')

const router = new Router();

// changed from /dragon/new because in index we now have /dragon/ already
router.get('/new/', (req, res) => {
    const dragon = req.app.locals.engine.generation.newDragon();
    DragonTable.storeDragon(dragon)
        .then(({ dragonId }) => {
            console.log('dragon id', dragonId);
            dragon.dragonId = dragonId;
            res.json({ dragon });
        })
        .catch(error => {
            console.error(error);
        })
}); // takes endpoint

module.exports = router;