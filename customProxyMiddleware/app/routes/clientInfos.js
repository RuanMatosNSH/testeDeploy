const express = require("express");
const router = express.Router();

router.get("/ip", async function (request, response) {
  let ip = "";
  const ips = request.headers["x-original-forwarded-for"];
  if (ips)
    ip = ips.split(",")[0];

  response.status(200).json({ ip });
});

module.exports = router;