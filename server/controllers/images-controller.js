'use strict';

const fs = require('fs');
const path = require('path');

module.exports = ({ config }) => {
    const images = fs.readdirSync(config.rootPath + '/server/images');

    return {
        getAll(req, res) {
            res.status(200).json({ images });
        }
    }
}
