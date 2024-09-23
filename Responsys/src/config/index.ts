import dotenv from "dotenv";
import { RESPONSYS_ENABLED_LOCAL_VALUE } from "../constants";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export default {
  responsysEnabled: process.env.RESPONSYS_ENABLED || RESPONSYS_ENABLED_LOCAL_VALUE,
  localDevelopment: process.env.LOCAL_DEVELOPMENT || "yes",
  users: {
    B2CLG: {
      user: "grendene.occ.lojagrendene",
      password: "V1aK11Cvpary@",
      folderName: "Loja_Grendene",
      host: "https://gbm1rs4-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CGNZaxy: {
      user: "grendene.occ",
      password: "techRM2020!",
      folderName: "Zaxy",
      host: "https://gk71qiq-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CGNRider: {
      user: "grendene_occ_rider",
      password: "techRM2020!",
      folderName: "Rider",
      host: "https://ghd1qk2-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CMN: {
      user: "grendene.occ.melissabr",
      password: "techRM2020!",
      folderName: "Melissa",
      host: "https://geg1qsf-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CMNApp: {
      user: "grendene.occ.melissabr",
      password: "techRM2020!",
      folderName: "Melissa",
      host: "https://geg1qsf-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CMIUS: {
      user: "grendene_occ",
      password: "techRM2020!",
      folderName: "Melissa",
      host: "https://rest001.rsys9.net/rest/api/v1.3",
    },
    B2CGNGrendeneKids: {
      user: "grendene_occ_grendenekids",
      password: "techRM2020!",
      folderName: "Grendene_Kids",
      host: "https://gcj1qke-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CGNIpanema: {
      user: "grendene_occ_ipanema",
      password: "techRM2020!",
      folderName: "Ipanema",
      host: "https://gb91qk1-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CGNGrendha: {
      user: "grendene.occ.grendha",
      password: "techRM2020!",
      folderName: "Grendha",
      host: "https://g991qjz-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
    B2CGNCartago: {
      user: "grendene_occ_cartago",
      password: "techRM2020!",
      folderName: "Cartago",
      host: "https://gjb1qk0-api.responsys.ocs.oraclecloud.com/rest/api/v1.3",
    },
  },
  envHttpsProxy:
    process.env.env_https_proxy ||
    "http://mgmt-ash-proxy.occa.us-ashburn-1.ocs.oraclecloud.com:8080",
  responsysSendFormUrl: {
    B2CLG: "https://relacionamento.lojagrendene.com.br/pub/rf",
    B2CMN: "https://relacionamento.melissa.com.br/pub/rf",
    B2CGNRider: "https://relacionamento.rider.com.br/pub/rf",
  },
};
