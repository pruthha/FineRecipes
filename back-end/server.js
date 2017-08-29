const https = require('https');
const express = require('express');
const app = express();
const key = "b4cc7bbd0da82f924ed12e1c47d02427&q=";

app.listen(8080, function () {
    console.log('Server running :)')
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.json("All good!");
})

app.get('/getRecipes', (req, res) => {
    https.get('https://food2fork.com/api/search?key=b4cc7bbd0da82f924ed12e1c47d02427&q=' + req.query.q, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.json(JSON.parse(data).recipes);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

})