const express = require('express');
//const axios = require('axios');
const axiosOccProxy = require("../../utils/OCCProxyAxiosRequester");
var router = express.Router();


router.get('/generatePdf',async function (request, response) {
    try {
      axiosOccProxy({
        method: 'GET',
        url: `${process.env.PDF_GENERATOR_HOST_DOMAIN}/${request.query.orderId}`,
        headers: {
          'api-key': process.env.PDF_GENERATOR_AUTH_TOKEN,
          'Content-Type': 'application/json',
          rejectUnauthorized: false, // Avoid SSL Conflict
        },
        responseType: 'arraybuffer', // Important
      }).then((result) => {
        response.setHeader('Content-type', result.headers['content-type']);
        response.setHeader('Accept-Ranges', result.headers['accept-ranges']);
        response.setHeader('Content-Length', result.headers['content-length']);
        response.setHeader('Alt-Svc', result.headers['alt-svc']);
        response.end(result.data, 'binary');
      }).catch((err) => {
          if(err.response.status == 404){
            response.status(404).send('PDF not found');
          }else{
            response.status(err.response.status).send('Could not get response from external API ' + err);
          }
      });
    } catch (error) {
      console.log('Could not get' + error);
      response.status(200).send('Could not get response from external API ' + error);
    }
  });

module.exports = router;