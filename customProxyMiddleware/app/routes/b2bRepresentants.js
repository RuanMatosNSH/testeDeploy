const express = require('express');
const axios = require('axios');
const axiosOccProxy = require("../../utils/OCCProxyAxiosRequester");
var router = express.Router();


router.get('/find',async function (request, response) {
  try {
    axios({
      method: 'GET',
      url: `${process.env.FIND_REPRESENTANT_HOST_DOMAIN}?site=${request.query.site}&uf=${request.query.uf}`,
      headers: {
        'Authorization': process.env.FIND_REPRESENTANT_AUTH_TOKEN,
        'Content-Type': 'application/json',
        rejectUnauthorized: false // Avoid SSL Conflict
      },
    }).then((result) => {
      response.status(200).send(result.data);
    }).catch((err) => {
        response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
    response.status(200).send('Could not get response from external API ' + error);
  }
});

module.exports = router;