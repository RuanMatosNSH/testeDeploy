import { Request, Response } from "express";
import { loginResponsys, productOpenedService } from "../services";
import { IProductOpened } from "../models";
import { RESPONSYS_ENABLED_FALSE, RESPONSYS_DISABLED_MESSAGE } from "../constants";
import config from "../config";

export const occProductOpenedController = async (req: Request, res: Response) => {
  try {
    if (config.responsysEnabled === RESPONSYS_ENABLED_FALSE) {
      return res.status(200).json({ success: RESPONSYS_DISABLED_MESSAGE });
    }

    const data = req.body as IProductOpened;

    const rsysUsers = config.users[data?.siteId];

    if (!rsysUsers) {
      return res
        .status(400)
        .json({ message: `The site id ${data?.siteId} does not exist on Responsys` });
    }

    const token = await loginResponsys(data?.siteId);

    if (!token) {
      return res.status(401).json({ message: "Error when authenticating with responsys" });
    }

    const response = await productOpenedService(data, token);

    res.status(200).json({ success: response });
  } catch (error: any) {
    console.error("occProductOpenedController - Error productOpened", error);

    res.status(400).json({
      message: "Could not get response from external Responsys API",
      detail: error?.detail ? error?.detail : "",
      error,
    });
  }
};
