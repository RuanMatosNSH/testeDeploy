'use strict'
const app = require('./src/app')
const env = require('./src/utils/EnvironmentVariables')
const dotenv = require('dotenv');
dotenv.config();
/* Teste 12345678910111213 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const port = env.PORT
app.listen(port, function () {  
})
