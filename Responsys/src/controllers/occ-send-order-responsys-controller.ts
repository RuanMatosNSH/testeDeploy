import { Request, Response } from "express";
import config from "../config";
import { loginResponsys, sendOrderItemsService, sendOrderResponsysService } from "../services";
import { deserializeOrder } from "../utils/desirialize-order";
import { IDiscountInfo } from "../models";

export const occSendOrderResponsysController = async (req: Request, res: Response) => {
  try {
    const [siteId, order] = deserializeOrder(req.body.order);
    const discountInfo = req.body.discountInfo as IDiscountInfo;

    const rsysUsers = config.users[siteId];

    if (!rsysUsers) {
      return res.status(400).json({ message: `The site id ${siteId} does not exist on Responsys` });
    }

    const token = await loginResponsys(siteId);

    if (!token) {
      return res.status(401).json({ message: "Error when authenticating with responsys" });
    }

    const response = await sendOrderResponsysService(order, discountInfo, token);
    const responseItem = await sendOrderItemsService(order, token);

    res.status(200).json({ message: "Order processed successfully", response, responseItem });
  } catch (error: any) {
    console.error("occSendOrderResponsysController - Error sendOrderResponsys", error);

    res.status(400).json({
      message: "Could not get response from external Responsys API",
      detail: error?.detail ? error?.detail : "",
      error,
    });
  }
};
