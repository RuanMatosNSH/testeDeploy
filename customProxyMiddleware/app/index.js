'use strict';
const bodyParser = require('body-parser');
const express = require('express');
var app = module.exports = express();
var winston = require('winston');
var expressWinston = require('express-winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console()
  ]
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ]
}));

try {
  // Load all routes Ruan teste adwadw
  require('./routes')(app, logger);
} catch (e) {
  winston.error(e.message);
}
