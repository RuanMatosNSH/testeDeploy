const axiConfig = require('../../utils/NewsletterToken');
const express = require('express');
var router = express.Router();

router.put('/v1', async function (request, response) {
  try {
    axiConfig({
      method: 'PUT',
      url: process.env.GRENDENE_MAIL_HOST_DOMAIN,
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
