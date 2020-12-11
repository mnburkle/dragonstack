const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
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
            const session = new Session({ username });
            const sessionString = session.toString();

            res.cookie('sessionString', sessionString, {
                expire: Date.now() + 3600000,
                httpOnly: true
                // secure: true // use with https
            });

            res.json({ message: 'success!!' });
        })
        .catch(error => next(error)); 
});

module.exports = router;

