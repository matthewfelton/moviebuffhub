// router for movies data 
const express = require('express');
const router = express.Router();

// connects to movies controller
const movies_controller = require('../controllers/movies')

router.get('/', movies_controller.pull_all_movies);

router.get('/:id', movies_controller.pull_single_movie);


// export module for rest of code to use
module.exports = router;