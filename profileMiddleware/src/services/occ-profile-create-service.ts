import { AXIOS_STORE_CLIENT } from ".";
import { IOccProfile } from "../models";

export const occCreateProfile = async (profile: IOccProfile, occCookie: string) => {
  try {
    const response = await AXIOS_STORE_CLIENT.post(`/ccstore/v1/profiles`, profile, {
      headers: {
        "Content-Type": "application/json",
        "x-ccsite": profile.siteId,
        Cookie: occCookie,
      },
    });

    if (response.status !== 200) throw new Error();

    return true;
  } catch (error) {
    console.error("Error store create profile: ", error);

    return null;
  }
};
