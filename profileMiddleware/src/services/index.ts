import axios from "axios";

import config from "../config";
import { occAdminAuthenticate } from "./occ-auth-service";
import { occCheckProfileExistsByCpfAndEmail } from "./occ-profile-get-service";
import { occCreateProfile } from "./occ-profile-create-service";

export const AXIOS_CLIENT = axios.create({
  baseURL: config.adminUrl,
});

export const AXIOS_STORE_CLIENT = axios.create({
  baseURL: config.storeUrl,
});

export { occAdminAuthenticate, occCheckProfileExistsByCpfAndEmail, occCreateProfile };
