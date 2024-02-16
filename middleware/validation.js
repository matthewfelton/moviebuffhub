// validation.js
const { body, validationResult } = require('express-validator');

const validateMovie = [
    body('title').notEmpty().withMessage('Title is required.'),
    body('genre').notEmpty().withMessage('Genre is required.'),
    body('rating').notEmpty().withMessage('Rating is required.'),
    body('runTime').notEmpty().withMessage('Run time is required.'),
    body('releaseYear').isNumeric().isLength({ min: 4, max: 4 }).withMessage('Invalid release year.'),
    body('director').notEmpty().withMessage('Director is required.'),
    body('metascore').isFloat({ min: 0, max: 100 }).withMessage('metascore is not an acceptable value.'),
];

const validateTVShow = [
    body('title').notEmpty().withMessage('Title is required.'),
    body('genre').notEmpty().withMessage('Genre is required.'),
    body('rating').notEmpty().withMessage('Rating is required.'),
    body('runTime').notEmpty().withMessage('Run time is required.'),
    body('airTime').notEmpty().withMessage('Air time is required.'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

module.exports = {
    validateMovie,
    validateTVShow,
    handleValidationErrors
};