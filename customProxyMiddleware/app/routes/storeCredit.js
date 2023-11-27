const express = require("express");
const router = express.Router();
const axiConfig = require("../../utils/StoreCreditToken");

router.get("/history", async function (request, response) {
  try {
    const siteId = request.query.siteId;
    const profileEmail = request.query.profileEmail;

    const responseSC = await axiConfig.get(process.env.STORE_CREDIT_HOST_DOMAIN + "/record", {
      params: {
        siteId: siteId,
        profileEmail: profileEmail,
      },
      rejectUnauthorized: false,
    });

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/balance", async function (request, response) {
  try {
    const { siteId, profileEmail } = request.query;

    const responseSC = await axiConfig.get(process.env.STORE_CREDIT_HOST_DOMAIN + "/balance", {
      params: {
        siteId,
        profileEmail,
      },
      rejectUnauthorized: false,
    });

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/validateBalance", async function (request, response) {
  try {
    const { siteId, profileEmail } = request.query;

    const responseSC = await axiConfig.get(process.env.STORE_CREDIT_HOST_DOMAIN + "/balance", {
      params: {
        siteId,
        profileEmail,
        delayTime: 5,
      },
      rejectUnauthorized: false,
    });

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

module.exports = router;
