const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const { setSession } = require('./helper');

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
                // set a session for account
                return setSession({ username, res });
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

module.exports = router;

