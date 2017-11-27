'use strict';

const router = require('express').Router();

module.exports = function ({ data, app, encryption, config }) {
    const imagesController = require('../controllers/images-controller')({ config });

    router
        .get('/all', imagesController.getAll);

    app.use('/images', router);
};