const { hash } = require('../account/helper');
const Session = require('../account/session');
const AccountTable = require('../account/table');

const setSession = ({ username, res, sessionId }) => {
    // set session cookie for a given username
    // will have res object in express that has the cookie setting method.
    return new Promise((resolve, reject) => {
        let session, sessionString; 
        if(sessionId) {
            // leave session undefined
            sessionString = Session.sessionString({ username, id: sessionId });

            setSessionCookie({ sessionString, res });

            resolve({ message: "session restored"});

        } else {
            session = new Session({ username });
            sessionString = session.toString();

            AccountTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username)
            })
            .then(() => {
                setSessionCookie({ sessionString, res });
    
                resolve({ message: "session created"});
            })
            .catch(error => reject(error));
        }
    });
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true
        // secure: true // use with https
    });
}

module.exports = { setSession };