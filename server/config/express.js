'use strict';

const bodyParser = require('body-parser');
const express = require('express');

module.exports = (app, config) => {
    app.use('/static', express.static(config.rootPath + 'server'));
    app.use(express.static(config.rootPath + 'server/images'));
    app.use(express.static(config.rootPath + 'public/dist'));

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

