'use strict';

const passport = require('passport'),
    User = require('../models/user-model'),
    config = require('../config'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {

    User.findOne({ email: email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
        }
        if (!user.hashedPasswordMatchInputPassword(password)) {
            return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
        }
        return done(null, user);
    });
});

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
});

passport.use(jwtLogin);
passport.use(localLogin);