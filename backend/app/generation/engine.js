const Generation = require('./index');
const GenerationTable = require('./table');

class GenerationEngine {
    constructor () {
        this.generation = null; 
        this.timer = null;
    }

    start() {
        this.buildNewGeneration()
    }

    stop() {
        clearTimeout(this.timer);
    }

    buildNewGeneration() {
        this.generation = new Generation();
        GenerationTable.storeGeneration(this.generation);
        console.log('new generation expires at', this.generation.expiration);
        this.timer = setTimeout(() => {
            this.buildNewGeneration();
        }, this.generation.expiration.getTime() - Date.now());
    }
}

module.exports = GenerationEngine;