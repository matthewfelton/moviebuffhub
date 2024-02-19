// router for movies data 
const express = require('express');
const router = express.Router();

// connects to movies controller
const tv_controller = require('../controllers/tvshows')
const validation = require('../middleware/validate');
const OAuth = require("../middleware/authorize");

router.get('/', OAuth.checkLogAll, tv_controller.pull_all_tv);

router.get('/:id', OAuth.checkLogAll, tv_controller.pull_single_tv);

router.post('/',  OAuth.checkLogAll ,validation.savetv, tv_controller.create_tv);

router.put('/:id', OAuth.checkLogAll, validation.savetv, tv_controller.update_tv);

router.delete('/:id', OAuth.checkLogAll, tv_controller.delete_tv);

// export module for rest of code to use
module.exports = router;