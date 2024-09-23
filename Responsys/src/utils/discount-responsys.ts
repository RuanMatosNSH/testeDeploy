import { IDiscountInfo, IDiscountInfoResponsys } from "../models";

export const discountResponsys = (discountInfo: IDiscountInfo): IDiscountInfoResponsys => {
  const discount: IDiscountInfoResponsys = {};

  if (
    discountInfo &&
    discountInfo.claimedCouponMultiPromotions &&
    Object.keys(discountInfo.claimedCouponMultiPromotions).length
  ) {
    const couponList = Object.keys(discountInfo.claimedCouponMultiPromotions);
    const promotionIds = couponList.map(
      (coupon: any) => discountInfo.orderCouponsMap[coupon].promotionId,
    );
    discount.CUPOM_PEDIDO = couponList.join(";");
    discount.ID_PROMOCAO = promotionIds.join(";");
  } else {
    discount.CUPOM_PEDIDO = "";
    discount.ID_PROMOCAO = "";
  }

  return discount;
};
