const { Router } = require('express'); // router class is not root export so have to require it within curly braces

const router = new Router();

// changed from /dragon/new because in index we now have /dragon/ already
router.get('/new/', (req, res) => {
    res.json({ dragon: req.app.locals.engine.generation.newDragon() });
}); // takes endpoint

module.exports = router;