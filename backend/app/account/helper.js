const SHA256 = require('crypto-js/sha256'); 
const { APP_SECRET } = require('../../secrets');

const hash = string => {
    // sha256 returns a complex object. so we use toString() to get 
    // actual string equiv 
    return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
}

module.exports = { hash };