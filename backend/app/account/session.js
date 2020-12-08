const uuid = require('uuid/v4');
const { hash } = require('./helper');

const SEPARATOR = '|';

class Session {
    // special constructor executed every time new instance created
    constructor({ username }) {
        this.username = username;
        // then we need UUID
        this.id = uuid();
    }

    // toString will be used in non-static context, compared to sessionString
    toString() {
        const { username, id } = this;
        return Session.sessionString({ username, id});
    }

    static parse(sessionString) {
        const sessionData = sessionString.split(SEPARATOR);
        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        };
    }

    static verify(sessionString) {
        const { username, id, sessionHash } = Session.parse(sessionString);
        const accountData = Session.accountData({ username, id });
        return (sessionHash === hash(accountData));
    }

    static accountData({ username, id }) {
        return `${username}${SEPARATOR}${id}`;
    }

    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id });
        return `${accountData}${SEPARATOR}${hash(accountData)}`;
    }
}

// // debugging code
// const foo = new Session({ username: 'foo' });
// const foostring = foo.toString();
// console.log("Session.parse(foostring)", Session.parse(foostring));
// console.log("verify real", Session.verify(foostring));
// const fakeFooString = `admin_${foostring}`;
// console.log("verify fake", Session.verify(fakeFooString));

module.exports = Session;