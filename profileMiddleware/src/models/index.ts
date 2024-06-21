export interface IOccProfile {
  firstName: string;
  lastName: string;
  siteId: string;
  gren_phoneNumber: string;
  autoLogin?: string;
  email?: string;
  emailConfirmation?: string;
  gren_cpf?: string;
  login?: string;
  password?: string;
  receiveEmail?: string;
  dateOfBirth?: string;
  gren_gender?: string;
  gren_preferenceSize?: string;
  newConfirmPassword?: string;
  newPassword?: string;
  oldPassword?: string;
}

export type IOccProfileListStatus = "profile_not_found" | "document_exists" | "login_email_exists";

export interface IOccProfileListResponse {
  total: number;
  items: IOccProfile[];
}

export interface IProfileResponse {
  message: string;
  status?: string | IOccProfileListStatus;
  data?: IOccProfile;
}
