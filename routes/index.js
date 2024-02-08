// Web index file for routes

const express = require('express');
const router = express.Router();


// swagger route
// router.use('/api-doc', require('./swagger'));
// points route to movies.js
router.use('/movies', require('./movies'));


module.exports = router;