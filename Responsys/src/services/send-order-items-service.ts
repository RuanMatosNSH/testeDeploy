import { AXIOS_CLIENT } from ".";
import config from "../config";
import { IOrder } from "../models";

export const sendOrderItemsService = async (order: IOrder, token: string) => {
  try {
    const { siteId } = order;

    const response = await AXIOS_CLIENT.post(
      `${config.users[siteId].host}/folders/${config.users[siteId].folderName}/suppData/SUP_Pedidos_Item/members`,
      {
        recordData: {
          fieldNames: [
            "ID_PEDIDO_ITEM_PEDIDO",
            "ID_PRODUTO_ITEM_PEDIDO",
            "SKU_ITEM_PEDIDO",
            "QUANTIDADE_ITEM_PEDIDO",
            "ORIGEM_ITEM_PEDIDO",
          ],
          records: order.items.map((item) => [
            order.id,
            item.productId,
            item.sku,
            item.quantity.toString(),
            item.gren_brand,
          ]),
          mapTemplateName: null,
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
    console.error("sendOrderItemsService: ", error);

    return false;
  }
};
