const { hash } = require('../account/helper');
const Session = require('../account/session');
const AccountTable = require('../account/table');

const setSession = ({ username, res }) => {
    // set session cookie for a given username
    // will have res object in express that has the cookie setting method.
    return new Promise((resolve, reject) => {
        const session = new Session({ username });
        const sessionString = session.toString();

        AccountTable.updateSessionId({
            sessionId: session.id,
            usernameHash: hash(username)
        })

        res.cookie('sessionString', sessionString, {
            expire: Date.now() + 3600000,
            httpOnly: true
            // secure: true // use with https
        });
    });
}

module.exports = { setSession };