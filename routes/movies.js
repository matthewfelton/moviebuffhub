// router for movies data 
const express = require('express');
const router = express.Router();

// connects to movies controller
const movies_controller = require('../controllers/movies')
const validation = require('../middleware/validate');
const OAuth = require("../middleware/authorize");

router.get('/', movies_controller.pull_all_movies);

router.get('/:id', movies_controller.pull_single_movie);

router.post('/', OAuth.checkLogStatus, validation.savemovie, movies_controller.create_movie);

router.put('/:id', OAuth.checkLogStatus, validation.savemovie, movies_controller.update_movie);

router.delete('/:id', OAuth.checkLogStatus, movies_controller.delete_movie);

// export module for rest of code to use
module.exports = router;