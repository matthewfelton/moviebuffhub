// points variable to path of db connection information 
const mongodb = require('../db/connection');
// important ObjectId and allows single pull movie to work and not error out and murder the server
const ObjectId = require('mongodb').ObjectId;

// pull all movies from db and creats an array using asynchronous fuction
const pull_all_movies = async (req, res, next) => {
    try {
        // Using MongoDB's async API to get the 'movies' collection 
        const result = await mongodb.getDb().db().collection('movies').find();
        
        // Converting the result to an array
        const lists = await result.toArray();

        // Setting the response header to indicate JSON content
        res.setHeader('Content-Type', 'application/json');
        
        // Sending a JSON response with the fetched movies
        res.status(200).json(lists);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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

// creates new movie and sends to db
const create_movie = async (req, res) => {
    try {
        const movie = {
            title: req.body.title,
            genre: req.body.genre,
            rating: req.body.rating,
            runTime: req.body.runTime,
            releaseYear: req.body.releaseYear,
            director: req.body.director,
            metascore: req.body.metascore
        };
        const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the movie.');
        }
    } catch (error) {
        // Handle errors here
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// update existing db
const update_movie = async (req, res) => {
    try {
      // Extracting movie ID from the request parameters
    const movie_Id = req.params.id;
      // Validate that movie_id is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(movie_Id)) {
        return res.status(400).json({ error: 'Invalid movie ID format' });
    }
    const movieId = new ObjectId(movie_Id);
      // Creating a movie object from the request body
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        runTime: req.body.runTime,
        releaseYear: req.body.releaseYear,
        director: req.body.director,
        metascore: req.body.metascore
    };
      // Updating the movie with the specified ID in the 'contacts' collection
    const response = await mongodb.getDb().db().collection('movies').replaceOne({ _id: movieId }, movie);
    console.log('Update Response:', response);
      // Responding with status 204 if the movie is successfully updated
    if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
        // Responding with status 404 if the movie does not exist
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
      // Log the error for troubleshooting
        console.error('Error in update_movie:', error);
      // Responding with status 500 and an error message if there's an issue
        res.status(500).json({ error: 'Some error occurred while updating the movie.' });
    }
};
// delete existing contact
const delete_movie = async (req, res) => {
    try {
      // Extracting contact ID from the request parameters
    const movie_Id = req.params.id;
      // Validate that contactId is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(movie_Id)) {
        return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    const movieId = new ObjectId(movie_Id);
      // Removing the movie with the specified ID from the 'movie' collection
    const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: movieId });
        console.log(response);
        // Responding with status 204 if the movie is successfully deleted
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // Responding with status 404 if the movie does not exist
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
      // Responding with status 500 and an error message if there's an issue
        console.error(error);
        res.status(500).json({ error: 'Some error occurred while deleting the movie.' });
    }
};

module.exports = {
    pull_all_movies,
    pull_single_movie,
    create_movie,
    update_movie,
    delete_movie
};