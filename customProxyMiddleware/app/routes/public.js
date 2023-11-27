const axiConfig = require("../../utils/OCCToken");
const express = require("express");
var router = express.Router();
const nconf = require('nconf');

const HOST = nconf.get('atg.server.admin.url') ? String(nconf.get('atg.server.admin.url')).replace('/zaxy', '') : 'https://a7727193c1tst-admin.occa.ocs.oraclecloud.com'
const ENV = "/ccadmin/v1/";

router.get("/profiles", function (request, response) {
  if (!request.query.document) {
    response.status(404).send({ error: true, message: "Document is required" });
    return;
  }

  let fullUrl = HOST + ENV + `/profiles?useAdvancedQParser=true&q=gren_cpf eq "${request.query.document}"and login sw "${request.query.siteId}"&fields=total`;

  try {
    axiConfig({
      method: "GET",
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      headers: { "X-CCAsset-Language": "pt_BR" }, // optional
    })
      .then((result) => {
        if (result.total > 0)
          response.json({
            userFound: true,
            message: "There's already a registred user with the same document",
          });
        else
          response.json({
            userFound: false,
            message: "No user found with the same document",
          });
      })
      .catch((err) => {
        response.status(404).send("Could not get response from admin " + err);
      });
  } catch (error) {
    console.log("Could not get" + error);
  }
});

router.get("/profiles/legacy", function (request, response) {
  if (!request.query.email) {
    response.status(404).send({ error: true, message: "Email is required" });
    return;
  }

  var fullUrl;
  if (request.query.siteId) {
    var siteId = request.query.siteId + "-";
    fullUrl =
      HOST +
      ENV +
      `/profiles?useAdvancedQParser=true&q=login co "` +
      siteId +
      `${request.query.email}"`;
  } else {
    fullUrl =
      HOST +
      ENV +
      `/profiles?useAdvancedQParser=true&q=email eq "${request.query.email}"`;
  }

  try {
    axiConfig({
      method: "GET",
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      headers: { "X-CCAsset-Language": "pt_BR" }, // optional
    })
      .then((result) => {
        if (result.items.length > 0 && result.items[0].gren_legacy)
          response.json({
            userLegacy: true,
            name: result.items[0].firstName,
            message: "Legacy User",
            active: result.items[0].active,
          });
        else if (result.items.length > 0)
          response.json({
            userLegacy: false,
            message: "Not a legacy user",
            active: result.items[0].active,
          });
        else response.json({ userLegacy: false, message: "Not a legacy user" });
      })
      .catch((err) => {
        response.status(404).send("Could not get response from admin " + err);
      });
  } catch (error) {
    console.log("Could not get" + error);
  }
});

router.get("/profiles/verifyEmail", function (request, response) {
  if (!request.query.email) {
    response.status(404).send({ error: true, message: "Email is required" });
    return;
  }

  var fullUrl;
  if (request.query.siteId) {
    var siteId = request.query.siteId + "-";
    fullUrl =
      HOST +
      ENV +
      `/profiles?useAdvancedQParser=true&q=login co "` +
      siteId +
      `${request.query.email}"`;
  } else {
    fullUrl =
      HOST +
      ENV +
      `/profiles?useAdvancedQParser=true&q=email eq "${request.query.email}"`;
  }

  try {
    axiConfig({
      method: "GET",
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      headers: { "X-CCAsset-Language": "pt_BR" }, // optional
    })
      .then((result) => {
        if (result.items.length > 0)
          response.json({ hasEmail: true, message: "Email registered", active: result.items[0].active });
        else
          response.json({ hasEmail: false, message: "Email not recognized" });
      })
      .catch((err) => {
        response.status(404).send("Could not get response from admin " + err);
      });
  } catch (error) {
    console.log("Could not get" + error);
  }
});

module.exports = router;
