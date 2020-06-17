const express = require('express'); // don't have to point to the directory, it'll find it in node modules
const GenerationEngine = require('./generation/engine.js');

// sets up the object that is a representation of the web server
// start and stop web server and requests
const app = express();
const engine = new GenerationEngine();

engine.start();

app.get('/dragon/new/', (req, res) => {
    res.json({ dragon: engine.generation.newDragon() });
}); // takes endpoint

module.exports = app; // export the app object
