'use strict';

const jwt = require('jsonwebtoken');

module.exports = ({ data, encryption, config }) => {
    function generateToken(user) {
        const payload = {
            id: user._id
        }

        return jwt.sign(payload, config.secret);
    }

    function setUserInfo(request) {
        return {
            _id: request._id,
            username: request.username,
            email: request.email,
            role: request.role
        };
    }

    return {
        getLoggedUser(req, res) {
            console.log(req.user);
            let user = {
                email: req.user.email,
                username: req.user.username,
                isAdmin: req.user.isAdmin,
                isBlocked: req.user.isBlocked
            };

            res.status(200).send({
                user
            });
        },
        login(req, res) {
            let email = req.body.email;

            data.getByEmail(email)
                .then(user => {
                    if (user) {
                        res.status(200).send({
                            success: true,
                            message: 'Sucessfully logged in!',
                            token: 'JWT ' + generateToken(user)
                        });
                    } else {
                        res.status(401).send({
                            success: false,
                            message: 'Invalid username or password'
                        });
                    }
                });
        },
        register(req, res) {
            const { email, username, password } = req.body;

            // Return error if no email provided
            if (!email) {
                return res.status(422).send({
                    success: false,
                    message: 'You must enter an email address.'
                });
            }

            // Return error if full name not provided
            if (!username) {
                return res.status(422).send({
                    success: false,
                    message: 'You must enter your user name.'
                });
            }

            // Return error if no password provided
            if (!password) {
                return res.status(422).send({
                    success: false,
                    message: 'You must enter a password.'
                });
            }

            const salt = encryption.generateSalt();
            const passHash = encryption.generateHashedPassword(salt, password);

            Promise.all([data.getByUsername(username), data.getByEmail(email)])
                .then(([foundUsername, foundEmail]) => {

                    if (foundUsername) {
                        res.status(409).send({
                            success: false,
                            message: 'Username already exist!'
                        });
                        return;
                    } else if (foundEmail) {
                        res.status(409).send({
                            success: false,
                            message: 'Email already exist!'
                        });
                        return;
                    }

                    data.createUser({ username, passHash, email, salt })
                        .then((user) => {
                            let userInfo = setUserInfo(user);

                            res.status(201).send({
                                success: true,
                                message: 'User registered!',
                                token: 'JWT ' + generateToken(userInfo),
                                user: userInfo
                            });
                        });
                });
        }
    }
}
