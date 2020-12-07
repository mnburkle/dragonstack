const uuid = require('uuid/v4');
const hash = require('./helper');

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

    static accountData({ username, id }) {
        return `${username}|${id}`;
    }

    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id });
        return `${accountData}|${hash(accountData)}`;
    }
}

module.exports = Session;