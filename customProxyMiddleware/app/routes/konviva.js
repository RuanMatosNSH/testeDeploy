const express = require("express");
const router = express.Router();
const axiosOccProxy = require("../../utils/OCCProxyAxiosRequester");
const nconf = require('nconf');

const STORE_HOST = nconf.get('atg.server.admin.url') ? String(nconf.get('atg.server.admin.url')).replace('/zaxy', '').replace('-admin', '-store') : 'https://admin:admin@a7727193c1tst-store.occa.ocs.oraclecloud.com'

router.post("/buildSsoUrl", async function (request, response) {
  try {
    const email = await getStoreFrontEmail(request, response);

    if (!email) {
      response.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const targetUrl = request.body.url;

    const body = {
      url: targetUrl,
      email,
    };

    const responseKonviva = await axiosOccProxy.post(
      process.env.KONVIVA_HOST_DOMAIN + "/login-konviva",
      body,
      {
        headers: {
          Authorization: "Basic " + process.env.KONVIVA_AUTH_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    response.status(200).json(responseKonviva.data);
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

const getStoreFrontEmail = async function (request, response) {
  try {
    const responseProfileOCC = await axiosOccProxy.get(
      STORE_HOST + "/ccstore/v1/profiles/current",
      {
        headers: {
          authorization: request.headers.authorization,
          "x-ccsite": "B2CCM",
          "Content-Type": "application/json",
        },
      }
    );

    if (responseProfileOCC.status === 200) {
      return responseProfileOCC.data.email;
    }
  } catch (error) {}

  return null;
};

module.exports = router;
