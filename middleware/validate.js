const validator = require('../helpers/validate');

const savemovie = (req, res, next) => {
    const validationRule = {
        title: 'notEmpty|string|withMessage:Title is required.',
        genre: 'notEmpty|string|withMessage:Genre is required.',
        rating: 'notEmpty|string|withMessage:Rating is required.',
        runTime: 'notEmpty|string|withMessage:Run time is required.',
        releaseYear: 'isNumeric|isLength:{min:4,max:4}|withMessage:Invalid release year.',
        director: 'notEmpty|string|withMessage:Director is required.',
        metascore: 'isFloat:{min:0,max:100}|withMessage:metascore is not an acceptable value.'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
            });
        } else {
            next();
        }
    });
};

const savetv = (req, res, next) => {
    const validationRule = {
        title: 'notEmpty|string|withMessage:Title is required.',
        genre: 'notEmpty|string|withMessage:Genre is required.',
        rating: 'notEmpty|string|withMessage:Rating is required.',
        runTime: 'notEmpty|string|withMessage:Run time is required.',
        airTime: 'notEmpty|string|withMessage:Air time is required.',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    savemovie,
    savetv
};