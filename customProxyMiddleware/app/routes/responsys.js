/** @format */

const express = require("express");
const router = express.Router();
const axiConfig = require("../../utils/ResponsysToken");
const ENV_KEYS = require("../../config/keys").responsysKeys();

router.post("/productOpened", async function (request, response) {
  try {
    const { siteId, profileEmail, productId, brand } = request.body;
    const rsysUsers = ENV_KEYS.users[siteId];

    if (rsysUsers) {
      await axiConfig.post(
        `${rsysUsers.host}/folders/${rsysUsers.folderName}/suppData/SUP_Navegacao/members`,
        {
          recordData: {
            fieldNames: [
              "EMAIL_NAVEGACAO",
              "PRODUTO_NAVEGACAO",
              "ORIGEM_NAVEGACAO",
            ],
            records: [[profileEmail, productId, brand]],
            mapTemplateName: null,
          },
          insertOnNoMatch: true,
          updateOnMatch: "REPLACE_ALL",
        },
        {
          rejectUnauthorized: false,
          siteId,
        }
      );

      response.status(200).json({ success: true });
    } else {
      response
        .status(400)
        .json({ message: `The site id ${siteId} does not exist on Responsys` });
    }
  } catch (error) {
    response.status(400).json({
      message: "Could not get response from external Responsys API",
      detail: error.detail ? error.detail : "",
      error,
    });
  }
});

router.post("/collectionOpened", async function (request, response) {
  try {
    const { siteId, profileEmail, collectionLink, profileOrigin } =
      request.body;
    const rsysUsers = ENV_KEYS.users[siteId];

    if (rsysUsers) {
      await axiConfig.post(
        `${rsysUsers.host}/folders/${rsysUsers.folderName}/suppData/SUP_Click_Results/members`,
        {
          recordData: {
            fieldNames: [
              "EMAIL_CLICK_RESULT",
              "LINK_CLICK_RESULT",
              "ORIGEM_CLICK_RESULT",
            ],
            records: [[profileEmail, collectionLink, profileOrigin]],
            mapTemplateName: null,
          },
          insertOnNoMatch: true,
          updateOnMatch: "REPLACE_ALL",
        },
        {
          rejectUnauthorized: false,
          siteId,
        }
      );

      response.status(200).json({ success: true });
    } else {
      response
        .status(400)
        .json({ message: `The site id ${siteId} does not exist on Responsys` });
    }
  } catch (error) {
    response.status(400).json({
      message: "Could not get response from external Responsys API",
      detail: error.detail ? error.detail : "",
      error,
    });
  }
});

router.post("/sendWishlist", async function (request, response) {
  try {
    const { email, skuId, color, origin, archetype, siteId, noDesejo } =
      request.body;
    const rsysUsers = ENV_KEYS.users[siteId];

    if (rsysUsers) {
      await axiConfig.post(
        `${rsysUsers.host}/folders/${rsysUsers.folderName}/suppData/SUP_Wishlist/members`,
        {
          recordData: {
            fieldNames: [
              "EMAIL_DESEJO",
              "PRODUCT_ID_DESEJO",
              "COR_DESEJO",
              "ORIGEM_DESEJO",
              "ARQUETIPO_DESEJO",
              "NO_DESEJO",
            ],
            records: [[email, skuId, color, origin, archetype, noDesejo]],
            mapTemplateName: null,
          },
          insertOnNoMatch: true,
          updateOnMatch: "REPLACE_ALL",
        },
        {
          rejectUnauthorized: false,
          siteId,
        }
      );

      response.status(200).json({ success: true });
    } else {
      response
        .status(400)
        .json({ message: `The site id ${siteId} does not exist on Responsys` });
    }
  } catch (error) {
    response.status(400).json({
      message: "Could not get response from external Responsys API",
      detail: error.detail ? error.detail : "",
      error,
    });
  }
});

module.exports = router;
