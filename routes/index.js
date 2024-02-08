// Web index file for routes

const express = require('express');
const router = express.Router();


// swagger route
router.use('/api-doc', require('./swagger'));



// other routes
router.use('/movies', require('./movies'));
router.use('/tvshows', require('./tvshows'));

module.exports = router;