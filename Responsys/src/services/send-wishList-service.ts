import { AXIOS_CLIENT } from ".";
import config from "../config";
import { ISendWishList } from "../models";

export const sendWishListService = async (data: ISendWishList, token: string) => {
  try {
    const { email, skuId, color, origin, archetype, noDesejo, siteId } = data;

    const response = await AXIOS_CLIENT.post(
      `${config.users[siteId].host}/folders/${config.users[siteId].folderName}/suppData/SUP_Wishlist/members`,
      {
        recordData: {
          fieldNames: [
            "EMAIL_DESEJO",
            "PRODUCT_ID_DESEJO",
            "COR_DESEJO",
            "ORIGEM_DESEJO",
            "ARQUETIPO_DESEJO",
            "NO_DESEJO",
          ],
          records: [[email, skuId, color, origin, archetype, noDesejo]],
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
    console.error("sendWishListService: ", error);

    return false;
  }
};
