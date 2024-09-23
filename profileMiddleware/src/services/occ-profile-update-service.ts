import { AXIOS_STORE_CLIENT } from ".";
import { IOccProfile } from "../models";

export const occUpdateProfile = async (profile: IOccProfile, occToken: string) => {
  try {
    const response = await AXIOS_STORE_CLIENT.put(`/ccstore/v1/profiles/current`, profile, {
      headers: {
        "Content-Type": "application/json",
        "x-ccsite": profile.siteId,
        Authorization: `Bearer ${occToken}`,
      },
    });

    if (response.status !== 200) throw new Error();

    return response.data as IOccProfile;
  } catch (error) {
    console.error("Error store create profile: ", error);

    return null;
  }
};
