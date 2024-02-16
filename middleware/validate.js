const validator = require('../helpers/validate');

const savemovie = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        genre: 'required|string',
        rating: 'required|string',
        runTime: 'required|string',
        releaseYear: 'numeric|digits:4',
        director: 'required|string',
        metascore: 'numeric|min:0|max:100'
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
        title: 'required|string',
        genre: 'required|string',
        rating: 'required|string',
        runTime: 'required|string',
        airTime: 'required|string'
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