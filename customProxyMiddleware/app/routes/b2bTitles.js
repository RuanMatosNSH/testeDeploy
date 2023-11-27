const express = require('express');
//const axios = require('axios');
const axiosOccProxy = require("../../utils/OCCProxyAxiosRequester");
var router = express.Router();


router.post('/getTitles',async function (request, response) {
  try {
    axiosOccProxy({
      method: 'POST',
      url: process.env.TITLES_HOST_DOMAIN,
      headers: {
        'Authorization': process.env.TITLES_AUTH_TOKEN,
        'Content-Type': 'application/json',
        rejectUnauthorized: false // Avoid SSL Conflict
      },
      data: request.body
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

router.post('/downloadTitles',async function (request, response) {
    try {
      axiosOccProxy({
        method: 'POST',
        url: process.env.DOWNLOAD_TITLES_HOST_DOMAIN,
        headers: {
          'api-key': process.env.DOWNLOAD_TITLES__AUTH_TOKEN,
          'Content-Type': 'application/json',
          rejectUnauthorized: false // Avoid SSL Conflict
        },
        data: request.body
      }).then((result) => {
        response.status(200).json(result.data);
      }).catch((err) => {
          response.status(404).send('Could not get response from external API ' + err);
      });
    } catch (error) {
      console.log('Could not get' + error);
      response.status(200).send('Could not get response from external API ' + error);
    }
  });

module.exports = router;