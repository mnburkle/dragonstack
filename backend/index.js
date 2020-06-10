// console.log("Hello Node Friend");

// setting this dragon variable to the 
// result of the module.exports line of 
// the dragons.js file
const Dragon = require('./dragon.js');

const friend = new Dragon({
    birthdate: new Date(), 
    nickname: 'friend'
});
const balloon = new Dragon({
    nickname: 'balloon',
    birthdate: new Date()
});

console.log('friend', friend);
console.log('balloon', balloon);