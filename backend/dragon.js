const TRAITS = require('./traits.json');

const DEFAULT_PROPERTIES = {
    nickname: 'unnamed',
    // object getter, can't have parameters
    get birthdate() {
        return new Date()
    },
    get randomTraits() {
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;

            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];
            traits.push({type: traitType, value: traitValue});
        });
        return traits;
    }
}

class Dragon {
    // accept a birthdate key, and a nickname key
    // need to have this '= {}' to provide the default value
    constructor({birthdate, nickname, traits} = {}) {
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    }
}

module.exports = Dragon;