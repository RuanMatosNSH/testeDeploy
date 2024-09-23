import { AXIOS_CLIENT } from ".";
import config from "../config";
import { IOrder, IDiscountInfo } from "../models";
import { discountResponsys } from "../utils/discount-responsys";

export const sendOrderResponsysService = async (
  order: IOrder,
  discountInfo: IDiscountInfo,
  token: string,
) => {
  try {
    const { siteId } = order;
    const origem = siteId == "B2CMNApp" ? "APP" : "ECOMMERCE";
    const discountResp = discountResponsys(discountInfo);

    const response = await AXIOS_CLIENT.post(
      `${config.users[siteId].host}/folders/${config.users[siteId].folderName}/suppData/SUP_Pedidos/members`,
      {
        recordData: {
          fieldNames: [
            "ID_PEDIDO",
            "EMAIL_PEDIDO",
            "TRANSPORTADORA_PEDIDO",
            "PAGAMENTO_PEDIDO",
            "EMISSAO_PEDIDO",
            "PREVISAO_ENTREGA_PEDIDO",

            "CODIGO_BOLETO_PEDIDO",
            "LINK_BOLETO_PEDIDO",
            "VENCIMENTO_BOLETO_PEDIDO",

            "DESCONTO_PEDIDO",
            "SUBTOTAL_PEDIDO",
            "FRETE_PEDIDO",
            "TOTAL_PEDIDO",
            "ORIGEM_VENDA",
            "CUPOM_PEDIDO",
            "ID_PROMOCAO",
          ],
          records: [
            [
              order.id,
              order.email,
              order.deliveryName,
              order.paymentMethod,
              order.submittedDate,
              order.estimatedDeliveryDate,

              order.boletoCode,
              order.boletoLink,
              order.boletoExpires,

              order.orderDiscount.toString(),
              order.subtotalPrice.toString(),
              order.shippingPrice.toString(),
              order.totalPrice.toString(),
              origem,
              discountResp.CUPOM_PEDIDO,
              discountResp.ID_PROMOCAO,
            ],
          ],
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
    console.error("sendOrderResponsysService: ", error);

    return false;
  }
};
