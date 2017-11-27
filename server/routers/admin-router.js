'use strict';

const passport = require('passport');
const router = require('express').Router();
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function ({ data, app, encryption, config }) {
    const adminController = require('../controllers/admin-controller')({ data, encryption, config });
    
    router
        .get('/getAllUsers', requireAuth, adminController.getAllUsers)
        .post('/blockUser', requireAuth, adminController.blockUser)
        .post('/unblockUser', requireAuth, adminController.unblockUser)
        .post('/setAdmin', requireAuth, adminController.setAdmin)
        .post('/unsetAdmin', requireAuth, adminController.unsetAdmin)
        .post('/resetUserPassword', requireAuth, adminController.resetUserPassword);

    app.use('/admin', router);
};