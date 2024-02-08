// router for movies data 
const express = require('express');
const router = express.Router();

// connects to movies controller
const tv_controller = require('../controllers/tvshows')

router.get('/', tv_controller.pull_all_tv);

router.get('/:id', tv_controller.pull_single_tv);

router.post('/', tv_controller.create_tv);

router.put('/:id', tv_controller.update_tv);

router.delete('/:id', tv_controller.delete_tv);

// export module for rest of code to use
module.exports = router;