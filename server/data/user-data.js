'use strict';

module.exports = (models, encryption) => {
    const { User } = models;

    return {
        getAll() {
            return new Promise((resolve, reject) => {
                User.find({}, (err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(users);
                });
            });
        },
        getById(userId) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        blockUser(id) {
            return new Promise((resolve, reject) => {
                this.getById(id)
                    .then(user => {
                        user.isBlocked = true;
                        user.save(err => {
                            resolve(user);
                        });
                    });
            });
        },
        unblockUser(id) {
            return new Promise((resolve, reject) => {
                this.getById(id)
                    .then(user => {
                        user.isBlocked = false;
                        user.save(err => {
                            resolve(user);
                        });
                    });
            });
        },
        setAdmin(id) {
            return new Promise((resolve, reject) => {
                this.getById(id)
                    .then(user => {
                        user.isAdmin = true;
                        user.save(err => {
                            resolve(user);
                        });
                    });
            });
        },
        unsetAdmin(id) {
            return new Promise((resolve, reject) => {
                this.getById(id)
                    .then(user => {
                        user.isAdmin = false;
                        user.save(err => {
                            resolve(user);
                        });
                    });
            });
        },
        resetPassword(id, password) {
            return new Promise((resolve, reject) => {
                this.getById(id)
                    .then(user => {
                        const salt = user.salt;
                        const passHash = encryption.generateHashedPassword(salt, '123456');
                        
                        user.passHash = passHash;
                        user.save(err => {
                            resolve(user);
                        });
                    });
            });
        },
        getByEmail(email) {
            return new Promise((resolve, reject) => {
                User.findOne({ email }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        createUser({ username, passHash, email, salt, isAdmin }) {
            let user = new User({
                username,
                passHash,
                email,
                salt,
                isAdmin
            });

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};