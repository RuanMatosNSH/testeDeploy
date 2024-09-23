export type siteIdType =
  | "B2CLG"
  | "B2CGNZaxy"
  | "B2CGNRider"
  | "B2CMN"
  | "B2CMIUS"
  | "B2CGNGrendeneKids"
  | "B2CGNIpanema"
  | "B2CGNGrendha"
  | "B2CGNCartago"
  | "B2CMNApp";

export type sendFormSiteIdType = "B2CLG" | "B2CGNRider" | "B2CMN";

export interface IProductOpened {
  siteId: siteIdType;
  profileEmail: string;
  productId: string;
  brand: string;
}

export interface ICollectionOpened {
  siteId: siteIdType;
  profileEmail: string;
  collectionLink: string;
  profileOrigin: string;
}

export interface ISendWishList {
  email: string;
  skuId: string;
  color: string;
  origin: string;
  archetype: string;
  noDesejo: string;
  siteId: siteIdType;
}

export interface ISendFormRequest {
  url: string;
  siteId: sendFormSiteIdType;
  queryParams: string;
}

export interface IOrderItem {
  productId: string;
  sku: string;
  quantity: number;
  gren_brand: string;
}

export interface IOrder {
  id: string;
  siteId: siteIdType;
  email: [string];
  cpf: string;
  submittedDate: string;
  paymentMethod: string;
  estimatedDeliveryDate: string;
  deliveryName: string;

  boletoCode: string;
  boletoLink: string;
  boletoExpires: string;

  orderDiscount: number;
  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;

  paymentGroups: [any];

  items: IOrderItem[];
}

export interface IDiscountInfo {
  claimedCouponMultiPromotions: [any];
  orderCouponsMap: [any];
}

export interface IDiscountInfoResponsys {
  CUPOM_PEDIDO?: string;
  ID_PROMOCAO?: string;
}
