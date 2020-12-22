const express = require('express'); // don't have to point to the directory, it'll find it in node modules
const cors = require('cors'); // function which returns the cors middleware. express will use it
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const GenerationEngine = require('./generation/engine.js');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');

// sets up the object that is a representation of the web server
// start and stop web server and requests
const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

// now identify backend server to have same origin as front end
app.use(cors({ origin: 'http://localhost:1234', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account', accountRouter);
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
