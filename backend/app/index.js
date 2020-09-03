const express = require('express'); // don't have to point to the directory, it'll find it in node modules
const GenerationEngine = require('./generation/engine.js');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');

// sets up the object that is a representation of the web server
// start and stop web server and requests
const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/dragon', dragonRouter); // attach all routes defined in dragon file, on the /dragon/ subroute
app.use('/generation', generationRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error',
        message: err.message
    })
});

engine.start();

module.exports = app; // export the app object
