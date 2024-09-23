import { IOrder, IOrderItem, siteIdType } from "../models";

export const deserializeOrder = (order: any): [siteIdType, IOrder] => {
  const profile = order.profile;
  const shippingInfo = JSON.parse(order.gren_additionalShippingInfo);
  const paymentMethod = JSON.parse(order.gren_additionalInfo).paymentMethod;
  const dateBoleto = {
    code: "",
    link: "",
    boletoExpires: "",
  };

  if (
    paymentMethod == "boleto" &&
    order.paymentGroups &&
    order.paymentGroups.length > 0 &&
    order.paymentGroups[0].paymentProps.data
  ) {
    const paymentInfo = JSON.parse(order.paymentGroups[0].paymentProps.data);

    dateBoleto.code = paymentInfo.reference;
    dateBoleto.link = paymentInfo.downloadUrl;
    dateBoleto.boletoExpires = paymentInfo.expiresAt;
  }

  const items: IOrderItem[] = [];

  for (const item of order.commerceItems) {
    let grenBrandValue = "";
    if (item.siteId === "B2CLG") {
      grenBrandValue = item.gren_brand;
    }

    const orderItem: IOrderItem = {
      productId: item.productId,
      sku: item.catalogRefId,
      quantity: item.quantity,
      gren_brand: grenBrandValue,
    };

    items.push(orderItem);
  }

  const shippingGroupsInfo = { estimatedDeliveryDate: "", deliveryName: "" };

  if (!shippingInfo) {
    if (order.shippingGroups?.length > 1) {
      const shippingGroupNames = order.shippingGroups
        .map(
          (shippingGroup: any) =>
            JSON.parse(shippingGroup?.shippingAddress?.gren_splitShippingInfo || "{}")
              .deliveryName || `Retire em loja - ${shippingGroup.locationId}`,
        )
        .join(";");

      shippingGroupsInfo.deliveryName = shippingGroupNames;
    } else {
      const currentShippingGroup = order.shippingGroups[0];
      const currentShippingGroupInfo = JSON.parse(
        currentShippingGroup?.shippingAddress?.gren_splitShippingInfo || "{}",
      );
      shippingGroupsInfo.estimatedDeliveryDate = currentShippingGroupInfo?.estimatedDeliveryDate;
      shippingGroupsInfo.deliveryName =
        currentShippingGroupInfo?.deliveryName ||
        `Retire em loja - ${currentShippingGroup.locationId}`;
    }
  }

  const returnOrder: IOrder = {
    id: order.id,
    siteId: order.siteId,
    email: profile.email,
    cpf: order.gren_documentId,
    submittedDate: order.submittedDate,
    paymentMethod: paymentMethod,
    estimatedDeliveryDate:
      shippingInfo?.estimatedDeliveryDate || shippingGroupsInfo?.estimatedDeliveryDate,
    deliveryName: shippingInfo?.deliveryName || shippingGroupsInfo?.deliveryName,

    boletoCode: dateBoleto.code,
    boletoLink: dateBoleto.link,
    boletoExpires: dateBoleto.boletoExpires,

    orderDiscount: order.priceInfo.discountAmount,
    subtotalPrice: order.priceInfo.rawSubtotal,
    shippingPrice: order.priceInfo.shipping,
    totalPrice: order.priceInfo.total,

    paymentGroups: order.paymentGroups,

    items: items,
  };

  return [order.siteId, returnOrder];
};
