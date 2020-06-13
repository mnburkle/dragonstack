const GenerationEngine = require('./generation_engine.js');

const engine = new GenerationEngine();
engine.start();

setTimeout(() => {
    engine.stop()
}, 20000);

// console.log('generation', generationEngine);

// const generation = new Generation();

// console.log('generation', generation);

// const grant = generation.newDragon();

// console.log('grant: ', grant);

// setTimeout(() => {
//     const mimar = generation.newDragon();
//     console.log('mimar', mimar);
// }, 15000);


// from before we had the generation stuff:

// setting this dragon variable to the 
// result of the module.exports line of 
// the dragons.js file

// const Dragon = require('./dragon.js');

// const friend = new Dragon({
//     birthdate: new Date(), 
//     nickname: 'friend'
// });
// const balloon = new Dragon({
//     nickname: 'balloon',
//     birthdate: new Date()
// });

// const meepy = new Dragon();

// // first parameter is a callback function
// // second parameter is the delay
// setTimeout(() => {
//     const grant = new Dragon();
//     console.log('grant', grant);
// }, 3000);

// console.log('friend', friend);
// console.log('balloon', balloon);
// console.log('meepy', meepy);