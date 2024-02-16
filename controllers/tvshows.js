// points variable to path of db connection information 
const mongodb = require('../db/connection');
// important ObjectId and allows single pull tv to work and not error out and murder the server
const ObjectId = require('mongodb').ObjectId;



// pull all tv from db and creats an array using asynchronous fuction
const pull_all_tv = async (req, res, next) => {
    try {
        // Using MongoDB's async API to get the 'tvshows' collection 
        const result = await mongodb.getDb().db().collection('tvshows').find();
        
        // Converting the result to an array
        const lists = await result.toArray();

        // Setting the response header to indicate JSON content
        res.setHeader('Content-Type', 'application/json');
        
        // Sending a JSON response with the fetched TV shows
        res.status(200).json(lists);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching TV shows:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const pull_single_tv = async (req, res, next) => {
    // Extracting the tv ID from the request parameters
    const tvId = new ObjectId(req.params.id);

    
    try {
        // Using MongoDB's async API to get the specified movie by ID
        const result = await mongodb
            .getDb()
            .db()
            .collection('tvshows')
            .find({ _id: tvId });
    
        const lists = await result.toArray();
    
        if (lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(404).json({ error: 'Tv show not found' });
        }
    } catch (error) {
        console.error('Error fetching single Tv show:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// creates new movie and sends to db
const create_tv = async (req, res) => {
    try {
        const tv = {
            title: req.body.title,
            genre: req.body.genre,
            rating: req.body.rating,
            runTime: req.body.runTime,
            airTime: req.body.airTime
        };
        const response = await mongodb.getDb().db().collection('tvshows').insertOne(tv);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the TV show.');
        }
    } catch (error) {
        // Handle errors here
        console.error("Error creating TV show:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// update existing db
const update_tv = async (req, res) => {
    try {
      // Extracting tv ID from the request parameters
    const tv_Id = req.params.id;
      // Validate that movie_id is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(tv_Id)) {
        return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    const tvId = new ObjectId(tv_Id);
      // Creating a movie object from the request body
    const tv = {
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        runTime: req.body.runTime,
        airTime: req.body.airTime
        
    };
      // Updating the movie with the specified ID in the 'contacts' collection
    const response = await mongodb.getDb().db().collection('tvshows').replaceOne({ _id: tvId }, tv);
    console.log('Update Response:', response);
      // Responding with status 204 if the movie is successfully updated
    if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
        // Responding with status 404 if the movie does not exist
            res.status(404).json({ error: 'Tv Show not found' });
        }
    } catch (error) {
      // Log the error for troubleshooting
        console.error('Error in update_tv:', error);
      // Responding with status 500 and an error message if there's an issue
        res.status(500).json({ error: 'Some error occurred while updating the tv show.' });
    }
};
// delete existing contact
const delete_tv = async (req, res) => {
    try {
      // Extracting contact ID from the request parameters
    const tv_Id = req.params.id;
      // Validate that contactId is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(tv_Id)) {
        return res.status(400).json({ error: 'Invalid tv show ID format' });
    }
    const tvId = new ObjectId(tv_Id);
      // Removing the movie with the specified ID from the 'movie' collection
    const response = await mongodb.getDb().db().collection('tvshows').deleteOne({ _id: tvId });
        console.log(response);
        // Responding with status 204 if the movie is successfully deleted
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // Responding with status 404 if the movie does not exist
            res.status(404).json({ error: 'tv show not found' });
        }
    } catch (error) {
      // Responding with status 500 and an error message if there's an issue
        console.error(error);
        res.status(500).json({ error: 'Some error occurred while deleting the tv show.' });
    }
};

module.exports = {
    pull_all_tv,
    pull_single_tv,
    create_tv,
    update_tv,
    delete_tv
};