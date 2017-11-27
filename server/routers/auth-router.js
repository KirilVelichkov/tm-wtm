'use strict';

const passport = require('passport');
const router = require('express').Router();
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function ({ data, app, encryption, config }) {
    const authController = require('../controllers/auth-controller')({ data, encryption, config });

    router
        .get('/getLoggedUser', requireAuth, authController.getLoggedUser)
        .post('/login', requireLogin, authController.login)
        .post('/register', requireAuth, authController.register)

    app.use('/auth', router);
};