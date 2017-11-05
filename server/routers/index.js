'use strict';

const fs = require('fs');
const path = require('path');

module.exports = ({ app, encryption, config, data }) => {

    fs.readdirSync(__dirname)
        .filter(x => x.includes('-router'))
        .forEach(file => {
            require(path.join(__dirname, file))({ app, encryption, config, data });
        });

    app.get('*', (req, res) => {
        res.status(404).send({
            message: 'Page not found!',
            success: false
        });
    });
};