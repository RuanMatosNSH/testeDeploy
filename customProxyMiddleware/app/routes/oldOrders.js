const axiConfig = require('../../utils/InformaticaToken');
const express = require('express');
var router = express.Router();


router.post('/v1', async function (request, response) {
  try {
    axiConfig({
      method: 'POST',
      url: process.env.GRENDENE_OLD_ORDERS_HOST_DOMAIN,
      data: request.body,
      rejectUnauthorized: false // Avoid SSL Conflict
    }).then((result) => {
      response.status(200).json(result);
    });

  } catch (error) {
    console.log('Could not get' + error);
    response.status(200).send('Could not get response from external API ' + error);
  }
});

module.exports = router;
