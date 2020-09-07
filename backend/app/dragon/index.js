const TRAITS = require('../../data/traits');
const DragonTable = require('./table')

const DEFAULT_PROPERTIES = {
    nickname: 'unnamed',
    dragonId: undefined,
    generationId: undefined,
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
    constructor({dragonId, birthdate, nickname, traits, generationId} = {}) {
        this.dragonId  = dragonId || DEFAULT_PROPERTIES.dragonId;
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
    }
}

module.exports = Dragon;