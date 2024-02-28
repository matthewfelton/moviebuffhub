// Web index file for routes

const express = require('express');
const router = express.Router();


// swagger route
router.use('/api-docs', require('./swagger'));



// other routes
router.use('/movies', require('./movies'));
router.use('/tvshows', require('./tvshows'));

router.get('*', (req, res) => {
    res.send('404: Page not found, sorry!')
})

module.exports = router;