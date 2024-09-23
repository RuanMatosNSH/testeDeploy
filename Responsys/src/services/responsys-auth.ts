import qs from "qs";
import config from "../config";
import { siteIdType } from "../models";
import { AXIOS_CLIENT } from ".";

const ENV_KEYS = config;

// Login
export const loginResponsys = async (siteId: siteIdType) => {
  try {
    const data = qs.stringify({
      user_name: ENV_KEYS.users[siteId].user,
      password: ENV_KEYS.users[siteId].password,
      auth_type: "password",
    });

    const response = await AXIOS_CLIENT.post(ENV_KEYS.users[siteId].host + "/auth/token", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.authToken;
  } catch (e) {
    console.error("login attemp failed", e);
    return "";
  }
};
