import { AXIOS_CLIENT } from ".";
import config from "../config";
import { IProductOpened } from "../models";

export const productOpenedService = async (data: IProductOpened, token: string) => {
  try {
    const { siteId, profileEmail, productId, brand } = data;

    const response = await AXIOS_CLIENT.post(
      `${config.users[siteId].host}/folders/${config.users[siteId].folderName}/suppData/SUP_Navegacao/members`,
      {
        recordData: {
          fieldNames: ["EMAIL_NAVEGACAO", "PRODUTO_NAVEGACAO", "ORIGEM_NAVEGACAO"],
          records: [[profileEmail, productId, brand]],
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
    console.error("productOpenedService: ", error);

    return false;
  }
};
