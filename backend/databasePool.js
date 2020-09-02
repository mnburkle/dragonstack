const { Pool } = require('pg');
const databaseConfiguration = require('./secrets/databaseConfiguration');

// needs lots of info.
// okay so in this, our data is exposed to connect to database
// if you publish on github then youre super vulnerable to anyone just signing in and dropping all your tables. so we move to SECRETS
const pool = new Pool(databaseConfiguration);

module.exports = pool;

// check if its working:
// string sql command, second param is callback fn
//pool.query('SELECT * FROM generation', (error, response) => {
//    if (error) return console.log('error', error);
//
//    console.log('response.rows', response.rows);
//});



