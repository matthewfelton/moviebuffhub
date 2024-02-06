// main database connection file

// connect to env file to pull DB creds
const dotenv = require("dotenv")
dotenv.config()

const MongoClient = require('mongodb').MongoClient;

let _db;

// creates connection to db
const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    // pull databse connection data from enviromental assets
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
        _db = client;
        callback(null, _db);
        })
        .catch((err) => {
        callback(err);
    });
};

// pull data from database or throws error for no connection
const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {initDb, getDb,};