const axios = require("axios");
var nconf = require("nconf");
var HttpsProxyAgent = require("https-proxy-agent");

var proxy =
  process.env.env_https_proxy ||
  "http://mgmt-ash-proxy.occa.us-ashburn-1.ocs.oraclecloud.com:8080";
var agent = new HttpsProxyAgent(proxy);

// Initial config set
const baseAxiosConfig = {
  timeout: 120000,
  httpsAgent: agent,
};

// instance for token manage making requests as Admin
const requestAdmin = (module.exports = axios.create(baseAxiosConfig));

// Login
const login = async () => {
  try {
    return axios({
      method: "POST",
      url: process.env.STORE_CREDIT_HOST_DOMAIN + "/auth",
      data: {
        user: process.env.STORE_CREDIT_USER,
        password: process.env.STORE_CREDIT_PASSWORD,
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
      if (requestAdmin.defaults.metadata) {
        const date = new Date();
        const timeout = requestAdmin.defaults.metadata.expiresIn * 1000;
        if (date - requestAdmin.defaults.metadata.lastRefresh <= timeout) {
          config.headers.Authorization =
            "Bearer " + requestAdmin.defaults.metadata.token;
          return config;
        }
      }
      const response = await login();
      console.log("got token" + response);
      const token = response.data.token;
      config.headers.Authorization = "Bearer " + token;
      requestAdmin.defaults.metadata = {
        token: token,
        lastRefresh: new Date(),
        expiresIn: response.data.expires_in,
      };

      return config;
    } catch (error) {
      throw new Error("Erro no login 123: \n" + error);
    }
  },
  (error) => {
    throw new Error("Erro no pré-login 1134: \n" + error);
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
