const axios = require("axios");
var nconf = require("nconf");
var ProxyAgent = require("https-proxy-agent");
var proxyUri =
  process.env.http_proxy ||
  nconf.get("general: proxy-server") ||
  "http://mgmt-ash-proxy.occa.us-ashburn-1.ocs.oraclecloud.com:8080";
var proxyAgent = ProxyAgent(proxyUri);

module.exports = axios.default.create({});

// module.exports = axios.default.create({ httpsAgent: proxyAgent });
