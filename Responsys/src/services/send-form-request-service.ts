import { AXIOS_CLIENT } from ".";
import { ISendFormRequest, sendFormSiteIdType } from "../models";
import config from "../config";

export const sendFormRequestService = async (data: ISendFormRequest) => {
  try {
    const { queryParams, siteId } = data;

    const url = config.responsysSendFormUrl[siteId as sendFormSiteIdType] || "";

    const response = await AXIOS_CLIENT.get(url, {
      params: queryParams,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    if (response.status !== 200) throw new Error("Error in request to responsys");

    return true;
  } catch (error) {
    console.error("sendFormRequestService :", error);

    return false;
  }
};
