// points variable to path of db connection information 
const mongodb = require('../db/connection');
// important ObjectId and allows single pull contact to work and not error out and murder the server
const ObjectId = require('mongodb').ObjectId;

// pull all movies from db and creats an array using asynchronous fuction
const pull_all_movies = async (req, res, next) => {
    // Using MongoDB's async API to get the 'movies' collection 
    const result = await mongodb.getDb().db().collection('movies').find();
    // Converting the result to an array
    result.toArray().then((lists) => {
        // Setting the response header to indicate JSON content
        res.setHeader('Content-Type', 'application/json');
        // Sending a JSON response with the fetched movies
        res.status(200).json(lists);
    });
};

const pull_single_movie = async (req, res, next) => {
    // Extracting the movie ID from the request parameters
    const movieId = new ObjectId(req.params.id);

    
    try {
        // Using MongoDB's async API to get the specified movie by ID
        const result = await mongodb
            .getDb()
            .db()
            .collection('movies')
            .find({ _id: movieId });
    
        const lists = await result.toArray();
    
        if (lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching single movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    pull_all_movies,
    pull_single_movie
};