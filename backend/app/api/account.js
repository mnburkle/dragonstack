const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const { setSession } = require('./helper');
const Session = require('../account/session');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);
    
    AccountTable.getAccount({usernameHash})
        .then(({ account }) => {
            if(!account) {
                return AccountTable.storeAccount({ usernameHash, passwordHash });
            } else {
                const conflictingError = new Error('This username has already been taken!');
                conflictingError.statusCode = 409; // http code represents conflict with existing data in server. 
                throw(conflictingError);
            }
        })
        .then(() => {
            return setSession({ username, res });
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error)); 
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
            if(account && account.passwordHash === hash(password)) {
                const { sessionId } = account;
                // set a session for account
                return setSession({ username, res, sessionId });
            } else {
                const error = new Error('Incorrect username/password');
                error.statusCode = 409; // http code represents conflict with existing data in server. 
                throw(error);
            }
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error)); 
});

router.get('/logout', (req, res, next) => {
    // req object gonna have a cookies field because of our little cookieparser
    // req.cookies.sessionString
    // will be in our ole format with the pipe | character. 

    const { username } = Session.parse(req.cookies.sessionString); // remember this old parse function
    
    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    })
    .then(() => {
        // remove session, opposite of res.cookie() 
        // clear cookie with the key of "sessionString"
        res.clearCookie('sessionString');
        
        res.json({ message: 'logout successful' });
    })
    .catch(error => next(error));
});

router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error('Invalid session');

        error.statusCode = 400;

        return next(error);
    } else {
        const { username, id } = Session.parse(SessionString);

        AccountTable.getAccount({ usernameHash: hash(username) })
            .then(({ account }) => {
                const authenticated = account.sessionId === id;
                res.json({ authenticated });
            })
            .catch(error => next(error));
    }
});


module.exports = router;

