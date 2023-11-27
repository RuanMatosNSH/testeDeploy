const axios = require('axios');
const querystring = require('querystring');
const nconf = require('nconf');

const HOST = nconf.get('atg.server.admin.url') ? String(nconf.get('atg.server.admin.url')).replace('/zaxy', '') : 'https://a7727193c1tst-admin.occa.ocs.oraclecloud.com'
// Initial config set
const key = process.env.ENVIROMENT_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYzM4OTFlOC1hYzJmLTQ4ZWQtYmYxOS1jNWI0ZDRkNDg5MDAiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE2NjQ0NTE0NzIsImlhdCI6MTYzMjkxNTQ3Mn0=.vC1eRWYDRtY8a2cVd/4Dn/OSfLEq1Gez86/a0aHmAQM=';

const baseAxiosConfig = {
  timeout: 20000,
  baseURL: HOST
};

// Axios Global config
axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;

// instance for token manage making requests as Admin
const requestAdmin = module.exports = axios.create(baseAxiosConfig);

// Login
const login = async () => {
  try {
    return await axios({
      method: 'POST',
      url: `${HOST}/ccadmin/v1/login`,
      data: querystring.stringify({
        'grant_type': 'client_credentials'})
    });
  } catch (e) {
    throw new Error(e);
  }
};

// Interceptor for setting header in requests
requestAdmin.interceptors.request.use(async (config) => {
  try {
    if (requestAdmin.defaults.metadata) {
      let date = new Date();
      let timeout = requestAdmin.defaults.metadata.expiresIn * 1000;
      if (date - requestAdmin.defaults.metadata.lastRefresh <= timeout) {
        config.headers.Authorization = requestAdmin.defaults.metadata.token;
        return config;
      }
    }
    const response = await login();
    let token = `Bearer ${response.data.access_token}`;
    config.headers.Authorization = token;
    requestAdmin.defaults.metadata = { token: token, lastRefresh: new Date(), expiresIn: response.data.expires_in };

    return config;
  } catch (error) {
    throw new Error('Erro no login: \n' + error);
  }
}, (error) => {
  throw new Error('Erro no pré-login: \n' + error);
}
);

// Interceptor for response treatment
requestAdmin.interceptors.response.use(async (response) => {
  return response.data;
}, (error) => {
  if (error.response.status === 401) {

  }
  throw new Error(JSON.stringify(error.config, undefined, 2));
}
);

// module.exports = {
//     requestAdmin
// };
