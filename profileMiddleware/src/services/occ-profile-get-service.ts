import { AXIOS_CLIENT, AXIOS_STORE_CLIENT } from ".";
import { IOccProfileListResponse, IOccProfile } from "../models";
import {
  PROFILE_LIST_STATUS_NOT_FOUND,
  PROFILE_LIST_STATUS_DOCUMENT,
  PROFILE_LIST_STATUS_LOGIN,
} from "../constants";

export const occCheckProfileExistsByCpfAndEmail = async (
  occToken: string,
  profile: IOccProfile,
) => {
  try {
    const treatedSiteId = profile.siteId.toLowerCase();
    const login = `${treatedSiteId}-${profile.email}`;
    const queryParams = `?useAdvancedQParser=true&q=login eq "${login}" or (login co "${treatedSiteId}" and gren_cpf eq "${profile.gren_cpf}")`;

    const response = await AXIOS_CLIENT.get(`/ccadmin/v1/profiles${queryParams}`, {
      headers: {
        Authorization: `Bearer ${occToken}`,
      },
    });

    if (response.status !== 200) throw new Error();

    const data = response.data as IOccProfileListResponse;
    const { items = [], total = 0 } = data;

    if (total < 1) return PROFILE_LIST_STATUS_NOT_FOUND;

    const profileItem = items.find((item) => item.gren_cpf === profile.gren_cpf);

    if (profileItem) return PROFILE_LIST_STATUS_DOCUMENT;

    return PROFILE_LIST_STATUS_LOGIN;
  } catch (error) {
    console.error("Error get admin profile by cpf and email: ", error);

    return null;
  }
};

export const occStoreGetCurrentProfile = async (occToken: string) => {
  try {
    const response = await AXIOS_STORE_CLIENT.get(`/ccstore/v1/profiles/current`, {
      headers: {
        Authorization: `Bearer ${occToken}`,
      },
    });

    if (response.status !== 200) throw new Error();

    return response.data as IOccProfile;
  } catch (error) {
    console.error("Error get occ store current profile: ", error);

    return null;
  }
};
