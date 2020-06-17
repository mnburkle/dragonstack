const express = require('express'); // don't have to point to the directory, it'll find it in node modules
const GenerationEngine = require('./generation/engine.js');
const dragonRouter = require('./api/dragon');

// sets up the object that is a representation of the web server
// start and stop web server and requests
const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;
app.use('/dragon', dragonRouter); // attach all routes defined in dragon file, on the /dragon/ subroute
engine.start();

module.exports = app; // export the app object
