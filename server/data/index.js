'use strict';

const fs = require('fs');
const path = require('path');

module.exports = () => {

    let User = require('../models/user-model');
    let models = { User };
    let data = {};
    let encryption = require('../utils/encryption');

        fs.readdirSync(__dirname)
            .filter(x => x.includes('-data'))
            .forEach(file => {
                let dataModule = require(path.join(__dirname, file))(models, encryption);

                Object.keys(dataModule)
                    .forEach(key => {
                        data[key] = dataModule[key];
                    });
            });

    return data;
};