'use strict';
// stand-alone index.js

var app = require('./app/index');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Read port from command line, config, or default
var port = (process.argv[2] || (process.env.npm_package_config_port || 3000));
//awuidjuwh
console.log('starting server...');
app.listen(port, function () {
  console.log('Listening on port ' + port + '...');
});
