const app = require('../app') // import constant exported from index.js

const port = 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
}); // listen for requests at the particular port, 3000
