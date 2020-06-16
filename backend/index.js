const express = require('express'); // don't have to point to the directory, it'll find it in node modules
const GenerationEngine = require('./generation_engine.js');

// sets up the object that is a representation of the web server
// start and stop web server and requests
const app = express();
const engine = new GenerationEngine();
const port = 3000;

engine.start();

app.get('/dragon/new/', (req, res) => {
    res.json({ dragon: engine.generation.newDragon() });
}); // takes endpoint


app.listen(port, () => {
    console.log(`listening on port ${port}`);
}); // listen for requests at the particular port, 3000

// setTimeout(() => {
//     engine.stop()
// }, 20000);
