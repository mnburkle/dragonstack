const { Router } = require('express');
const AccountTable = require('../account/table.js');
const { hash } = require('../account/helper');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);
    
    AccountTable.getAccount({usernameHash})
        .then(({ account }) => {
            if(!account) {
                AccountTable.storeAccount({ usernameHash, passwordHash })
                    .then(() => res.json({ message: 'success!' }))
                    .catch(error => next(error));
            } else {
                const conflictingError = new Error('This username has already been taken!');
                conflictingError.statusCode = 409; // http code represents conflict with existing data in server. 
                next(conflictingError);
            }
        })
        .catch(error => next(error)); 
});

module.exports = router;

