import { Request, Response } from "express";
import { RESPONSYS_ENABLED_FALSE, RESPONSYS_DISABLED_MESSAGE } from "../constants";
import { ISendFormRequest } from "../models";
import config from "../config";
import { sendFormRequestService } from "../services/send-form-request-service";

export const occSendFormRequestController = async (req: Request, res: Response) => {
  try {
    if (config.responsysEnabled === RESPONSYS_ENABLED_FALSE) {
      return res.status(200).json({ success: RESPONSYS_DISABLED_MESSAGE });
    }

    const data = req.body as ISendFormRequest;

    const rsysUsers = config.users[data?.siteId];

    if (!rsysUsers) {
      return res
        .status(400)
        .json({ message: `The site id ${data?.siteId} does not exist on Responsys` });
    }

    const response = await sendFormRequestService(data);

    res.status(200).json({ success: response });
  } catch (error: any) {
    console.error("occSendFormRequestController - Error sendFormRequest", error);

    res.status(400).json({
      message: "Could not get response from external Responsys API",
      detail: error?.detail ? error?.detail : "",
      error,
    });
  }
};
