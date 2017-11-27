'use strict';

const express = require('express');
const app = express();
const config = require('./config');
const database = require('./config/database')(config);
const data = require('./data')();
const encryption = require('./utils/encryption');

require('./config/passport');
require('./config/express')(app,config);
require('./routers')({ app, encryption, config, data });


app.listen(config.port, () => console.log('Server running on port: ' + config.port));