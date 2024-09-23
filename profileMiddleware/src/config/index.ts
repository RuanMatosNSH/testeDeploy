import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export default {
  adminUrl: process.env.ADMIN_URL || "https://a7727193c1tst-admin.occa.ocs.oraclecloud.com",
  storeUrl: process.env.OCC_URL_STORE || "https://a7727193c1tst-store.occa.ocs.oraclecloud.com",
  appKey:
    process.env.ENVIROMENT_KEY ||
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNmU3NGJmNS0xMTBjLTQ0OGItODdmOC01YjMwYzZjNTIwYjAiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE3MjM2NTYzNjMsImlhdCI6MTY5MjEyMDM2M30=.vUchw5fUiDQNMlKFCp4bE53YWvCIZpKqUt/alQgItPQ=",
};
