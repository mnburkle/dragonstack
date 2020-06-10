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

const meepy = new Dragon();

// first parameter is a callback function
// second parameter is the delay
setTimeout(() => {
    const grant = new Dragon();
    console.log('grant', grant);
}, 3000);

console.log('friend', friend);
console.log('balloon', balloon);
console.log('meepy', meepy);