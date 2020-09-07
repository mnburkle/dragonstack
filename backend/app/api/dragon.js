const { Router } = require('express'); // router class is not root export so have to require it within curly braces
const DragonTable = require('../dragon/table')
const DragonTraitTable = require('../dragonTrait/table')

const router = new Router();

// changed from /dragon/new because in index we now have /dragon/ already
router.get('/new/', (req, res, next) => {
    const dragon = req.app.locals.engine.generation.newDragon();
    DragonTable.storeDragon(dragon)
        .then(({ dragonId }) => {
            console.log('dragon id', dragonId);
            dragon.dragonId = dragonId;
            res.json({ dragon });
        })
        .catch(error => {
            next(error); // sends error to next capable piece of errorhandling middleware.
        });
}); // takes endpoint

module.exports = router;