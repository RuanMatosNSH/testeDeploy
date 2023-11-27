const axios = require("axios");
var qs = require("qs");
var HttpsProxyAgent = require("https-proxy-agent");

var proxy =
  process.env.env_https_proxy ||
  "http://mgmt-ash-proxy.occa.us-ashburn-1.ocs.oraclecloud.com:8080";
var agent = new HttpsProxyAgent(proxy);

const ENV_KEYS = require("../config/keys").responsysKeys();
// Initial config set
const baseAxiosConfig = {
  timeout: 120000,
  httpsAgent: agent,
};

// instance for token manage making requests as Admin
const requestAdmin = (module.exports = axios.create(baseAxiosConfig));

// Login
const login = async (siteId) => {
  try {
    const data = qs.stringify({
      user_name: ENV_KEYS.users[siteId].user,
      password: ENV_KEYS.users[siteId].password,
      auth_type: "password",
    });

    return axios({
      method: "POST",
      url: ENV_KEYS.host + "/auth/token",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent: agent,
      rejectUnauthorized: false, // Avoid SSL Conflict
    });
  } catch (e) {
    console.log("login attemp failed");
    throw new Error(e);
  }
};

// Interceptor for setting header in requests
requestAdmin.interceptors.request.use(
  async (config) => {
    try {
      const siteId = config.siteId;
      if (
        requestAdmin.defaults.metadata &&
        requestAdmin.defaults.metadata[siteId]
      ) {
        const date = new Date();
        const metadata = requestAdmin.defaults.metadata[siteId];
        const timeout = metadata.expiresIn * 1000;
        if (date - metadata.lastRefresh <= timeout) {
          config.headers.Authorization = metadata.token;
          return config;
        }
      }

      const response = await login(siteId);
      const token = response.data.authToken;
      config.headers.Authorization = token;

      if (!requestAdmin.defaults.metadata) {
        requestAdmin.defaults.metadata = {};
      }

      requestAdmin.defaults.metadata[siteId] = {
        token,
        lastRefresh: new Date(),
        expiresIn: 7200, // 2h
      };

      return config;
    } catch (error) {
      throw new Error("Erro no login: \n" + error);
    }
  },
  (error) => {
    throw new Error("Erro no pré-login: \n" + error);
  }
);

// Interceptor for response treatment
requestAdmin.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    throw new Error(error);
  }
);
