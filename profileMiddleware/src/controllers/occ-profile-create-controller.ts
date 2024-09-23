import { Request, Response } from "express";

import {
  occAdminAuthenticate,
  occCheckProfileExistsByCpfAndEmail,
  occCreateProfile,
} from "../services";
import { IOccProfile, IOccProfileListStatus, IProfileResponse } from "../models";
import { PROFILE_LIST_STATUS_NOT_FOUND } from "../constants";

const RESPONSE_DATA: IProfileResponse = { message: "" };

const treatRespToExistingProfile = (res: Response, profileListStatus: IOccProfileListStatus) => {
  RESPONSE_DATA.status = profileListStatus;
  RESPONSE_DATA.message = "Profile is already registered";

  return res.status(400).json(RESPONSE_DATA);
};

export const occCreateProfileController = async (req: Request, res: Response) => {
  try {
    const { cookie = "" } = req.headers;
    const data = req.body as IOccProfile;

    const token = await occAdminAuthenticate();

    if (!token) throw new Error();

    const profileListStatus = await occCheckProfileExistsByCpfAndEmail(token, data);

    if (!profileListStatus) throw new Error();

    const profileExists = profileListStatus !== PROFILE_LIST_STATUS_NOT_FOUND;
    if (profileExists) return treatRespToExistingProfile(res, profileListStatus);

    const response = await occCreateProfile(data, cookie);

    if (!response) {
      RESPONSE_DATA.message = "Error creating profile";
      RESPONSE_DATA.status = "error";

      return res.status(400).json(RESPONSE_DATA);
    }

    RESPONSE_DATA.message = "Profile created successfully";
    RESPONSE_DATA.status = "success";

    return res.status(200).json(RESPONSE_DATA);
  } catch (error) {
    RESPONSE_DATA.status = "error";
    RESPONSE_DATA.message = "Internal server error";

    return res.status(500).json(RESPONSE_DATA);
  }
};
