'use strict';

module.exports = ({ data, encryption, config }) => {



    return {
        getAllUsers(req, res) {
            data.getAll()
                .then((users) => {
                    res.status(200).send({ users });
                });
        },
        blockUser(req, res) {
            const id = req.body.id;

            data.blockUser(id)
                .then(user => {
                    if (user) {
                        res.status(200).send({
                            message: `${user.username} is now blocked!`
                        });
                    } else {
                        res.status(404).send({ message: 'user not found' });
                    }
                });
        },
        unblockUser(req, res) {
            const id = req.body.id;

            data.unblockUser(id)
                .then(user => {
                    if (user) {
                        res.status(200).send({
                            message: `${user.username} is no longer blocked!`
                        });
                    } else {
                        res.status(404).send({ message: 'user not found' });
                    }
                });
        },
        setAdmin(req, res) {
            const id = req.body.id;

            data.setAdmin(id)
                .then(user => {
                    if (user) {
                        res.status(200).send({
                            message: `${user.username} is now admin!`
                        });
                    } else {
                        res.status(404).send({ message: 'user not found' });
                    }
                });
        },
        unsetAdmin(req, res) {
            const id = req.body.id;

            data.unsetAdmin(id)
                .then(user => {
                    if (user) {
                        res.status(200).send({
                            message: `${user.username} is no longer admin!`
                        });
                    } else {
                        res.status(404).send({ message: 'user not found' });
                    }
                });
        },
        resetUserPassword(req, res) {
            const id = req.body.id;
            
            data.resetPassword(id)
                .then(user => {
                    if (user) {
                        res.status(200).send({
                            message: 'Password reset!'
                        });
                    } else {
                        res.status(404).send({ message: 'user not found' });
                    }
                });
        }
    }
}
