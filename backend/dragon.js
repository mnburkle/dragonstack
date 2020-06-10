const DEFAULT_PROPERTIES = {
    nickname: 'unnamed',
    birthdate: new Date()
}

class Dragon {
    // accept a birthdate key, and a nickname key
    // need to have this '= {}' to provide the default value
    constructor({birthdate, nickname} = {}) {
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    }
}

module.exports = Dragon;