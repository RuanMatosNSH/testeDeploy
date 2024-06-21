import { Request, Response } from "express";
import { IOccProfile, IProfileResponse } from "../models";
import { occStoreGetCurrentProfile } from "../services/occ-profile-get-service";
import { occUpdateProfile } from "../services/occ-profile-update-service";

const RESPONSE_DATA: IProfileResponse = { message: "" };
const RESPONSE_DATA_UNAUTHORIZED: IProfileResponse = {
  status: "unaurthorized",
  message: "Token not is valid",
};

export const occUpdateProfileController = async (req: Request, res: Response) => {
  try {
    const { authorization = "" } = req.headers;
    const data = req.body as IOccProfile;
    const tokenExists = authorization ? true : false;

    if (!tokenExists) return res.status(401).json(RESPONSE_DATA_UNAUTHORIZED);

    const token = authorization.split(" ")[1];

    const profile = await occStoreGetCurrentProfile(token);

    if (!profile || !profile.email) return res.status(401).json(RESPONSE_DATA_UNAUTHORIZED);

    const formattedProfile: IOccProfile = {
      firstName: data.firstName,
      lastName: data.lastName,
      siteId: data.siteId,
      gren_phoneNumber: data.gren_phoneNumber,
      gren_gender: data?.gren_gender,
      gren_preferenceSize: data?.gren_preferenceSize,
      receiveEmail: data?.receiveEmail,
      newConfirmPassword: data?.newConfirmPassword,
      newPassword: data?.newPassword,
      oldPassword: data?.oldPassword,
    };

    if (!profile.dateOfBirth) formattedProfile.dateOfBirth = data?.dateOfBirth;

    const response = await occUpdateProfile(formattedProfile, token);

    if (!response) {
      RESPONSE_DATA.message = "Error updating profile";
      RESPONSE_DATA.status = "error";

      return res.status(400).json(RESPONSE_DATA);
    }

    RESPONSE_DATA.message = "Profile updated successfully";
    RESPONSE_DATA.status = "success";
    RESPONSE_DATA.data = response;

    return res.status(200).json(RESPONSE_DATA);
  } catch (error) {
    RESPONSE_DATA.status = "error";
    RESPONSE_DATA.message = "Internal server error";

    return res.status(500).json(RESPONSE_DATA);
  }
};
