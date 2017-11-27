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
            username: request.username,
            email: request.email,
            isAdmin: request.isAdmin,
            isBlocked: request.isBlocked,
            avatar: request.avatar
        };
    }

    return {
        getLoggedUser(req, res) {
            let user = setUserInfo(req.user);
            
            res.status(200).send({
                user
            });
        },
        login(req, res) {
            let email = req.body.email;

            data.getByEmail(email)
                .then(foundUser => {
                    if (foundUser && !foundUser.isBlocked) {
                        let user = setUserInfo(foundUser);
                        
                        res.status(200).send({
                            success: true,
                            message: 'Sucessfully logged in!',
                            token: 'JWT ' + generateToken(foundUser),
                            user
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
            const { email, username, password, isAdmin } = req.body;
            
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

            if (!req.user.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message:'Unauthorized'
                })
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

                    data.createUser({ username, passHash, email, salt, isAdmin })
                        .then((user) => {
                            res.status(201).send({
                                success: true,
                                message: 'User registered!'
                            });
                        });
                });
        }
    }
}
