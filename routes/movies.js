// router for movies data 
const express = require('express');
const router = express.Router();

// connects to movies controller
const movies_controller = require('../controllers/movies')
const validation = require('../middleware/validate');

router.get('/', movies_controller.pull_all_movies);

router.get('/:id', movies_controller.pull_single_movie);

router.post('/', validation.savemovie, movies_controller.create_movie);

router.put('/:id', validation.savemovie, movies_controller.update_movie);

router.delete('/:id', movies_controller.delete_movie);

// export module for rest of code to use
module.exports = router;