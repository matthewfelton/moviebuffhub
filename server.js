// express web server main js file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// points variable to path of db connection information 
const mongodb = require('./db/connection');

// attempts to pull port or default to 8080
const port = process.env.port || 8080;

app
    .use(cors({
        origin: '*', // Replace with your frontend domain or '*' for any origin
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE', // Add DELETE and PUT to the allowed methods
        credentials: true, // Include cookies or authorization headers
    }))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', require('./routes'));

// Attempts to connect to database throws error or success message
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});