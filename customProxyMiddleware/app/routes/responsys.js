const express = require("express");
const router = express.Router();
const axiConfig = require("../../utils/ResponsysToken");
const ENV_KEYS = require("../../config/keys").responsysKeys();

router.post("/productOpened", async function (request, response) {
  try {
    const { siteId, profileEmail, productId } = request.body;
    const rsysUsers = ENV_KEYS.users[siteId];

    if (rsysUsers) {
      await axiConfig.post(
        `${ENV_KEYS.host}/folders/${rsysUsers.folderName}/suppData/SUP_Navegacao/members`,
        {
          recordData: {
            fieldNames: ["EMAIL_NAVEGACAO", "PRODUTO_NAVEGACAO"],
            records: [[profileEmail, productId]],
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
    const { siteId, profileEmail, collectionLink, profileOrigin } = request.body;
    const rsysUsers = ENV_KEYS.users[siteId];

    if (rsysUsers) {
      await axiConfig.post(
        `${ENV_KEYS.host}/folders/${rsysUsers.folderName}/suppData/SUP_Click_Results/members`,
        {
          recordData: {
            fieldNames: ["EMAIL_CLICK_RESULT", "LINK_CLICK_RESULT", "ORIGEM_CLICK_RESULT"],
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
      )

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
