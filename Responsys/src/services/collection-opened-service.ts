import { AXIOS_CLIENT } from ".";
import config from "../config";
import { ICollectionOpened } from "../models";

export const collectionOpenedService = async (data: ICollectionOpened, token: string) => {
  try {
    const { siteId, profileEmail, collectionLink, profileOrigin } = data;

    const response = await AXIOS_CLIENT.post(
      `${config.users[siteId].host}/folders/${config.users[siteId].folderName}/suppData/SUP_Click_Results/members`,
      {
        recordData: {
          fieldNames: ["EMAIL_CLICK_RESULT", "LINK_CLICK_RESULT", "ORIGEM_CLICK_RESULT"],
          records: [[profileEmail, collectionLink, profileOrigin]],
          mapTemplateName: null,
          siteId: siteId,
        },
        insertOnNoMatch: true,
        updateOnMatch: "REPLACE_ALL",
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    if (response.status !== 200) throw new Error("Error in request to responsys");

    return true;
  } catch (error) {
    console.error("collectionOpenedService: ", error);

    return false;
  }
};
