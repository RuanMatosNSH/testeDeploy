import axios from "axios";
import { loginResponsys } from "./responsys-auth";
import { HttpsProxyAgent } from "https-proxy-agent";
import { productOpenedService } from "./product-opened-service";
import { collectionOpenedService } from "./collection-opened-service";
import { sendWishListService } from "./send-wishList-service";
import config from "../config";
import { sendFormRequestService } from "./send-form-request-service";
import { sendOrderResponsysService } from "./send-order-responsys-service";
import { sendOrderItemsService } from "./send-order-items-service";

const proxy = config.envHttpsProxy;
const agent = new HttpsProxyAgent(proxy);

export const AXIOS_CLIENT = axios.create({
  baseURL: "",
  httpsAgent: agent,
});

export {
  loginResponsys,
  productOpenedService,
  collectionOpenedService,
  sendWishListService,
  sendFormRequestService,
  sendOrderResponsysService,
  sendOrderItemsService,
};
