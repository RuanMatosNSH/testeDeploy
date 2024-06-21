import qs from "qs";

import { AXIOS_CLIENT } from ".";
import config from "../config";

export const occAdminAuthenticate = async () => {
  try {
    const data = qs.stringify({
      grant_type: "client_credentials",
    });

    const token = await AXIOS_CLIENT.post("/ccadmin/v1/login", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${config.appKey}`,
      },
    });

    if (token.status !== 200) throw new Error();

    return token.data.access_token as string;
  } catch (error) {
    console.error("Error occ admin authenticate: ", error);

    return null;
  }
};
