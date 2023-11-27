'use strict';
const axios = require('axios');
var nconf = require('nconf');
var HttpsProxyAgent = require('https-proxy-agent');

var proxy = process.env.env_https_proxy || 'http://mgmt-ash-proxy.occa.us-ashburn-1.ocs.oraclecloud.com:8080';
var agent = new HttpsProxyAgent(proxy);

module.exports = axios.create({ httpsAgent: agent });
