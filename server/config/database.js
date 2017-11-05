'use strict';
const mongoose = require('mongoose');
require('colors');

mongoose.Promise = global.Promise

module.exports = (config) => {
    mongoose.connect(config.connectionString, { useMongoClient: true });

    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            console.log(err);
        }

        console.log('Mongo connected!'.blue);
    });

    db.on('error', err => console.log('Database error: '.red + err));

    return mongoose;
}