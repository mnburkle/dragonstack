const { Router } = require('express')

const router = new Router();

// don't need the /new/ endpoint. 
router.get('/', (req, res) => {
    res.json({ generation: req.app.locals.engine.generation });
}); // takes endpoint

module.exports = router;