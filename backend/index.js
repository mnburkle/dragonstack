// console.log("Hello Node Friend");

// setting this dragon variable to the 
// result of the module.exports line of 
// the dragons.js file
const Dragon = require('./dragon.js');

const friend = new Dragon(new Date(), 'friend')
const balloon = new Dragon(new Date(), 'balloon')

console.log('friend', friend);
console.log('balloon', balloon);