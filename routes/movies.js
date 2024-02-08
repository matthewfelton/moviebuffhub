// router for movies data 
const express = require('express');
const router = express.Router();

// connects to movies controller
const movies_controller = require('../controllers/movies')

router.get('/', movies_controller.pull_all_movies);

router.get('/:id', movies_controller.pull_single_movie);

router.post('/', movies_controller.create_movie);

router.put('/:id', movies_controller.update_movie);

router.delete('/:id', movies_controller.delete_movie);

// export module for rest of code to use
module.exports = router;