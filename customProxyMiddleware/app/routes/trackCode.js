const express = require('express');
const axios = require('axios');
var router = express.Router();

router.get('/trackCode', async function (request, response) {
  try {
    axios({
      method: 'GET',
      url: 'https://api.intelipost.com.br/api/v1/shipment_order/' + request.query.idOrder,
      headers: {
        'api-key': 'a052bc3eed50fecd538d3c2cd046a749b620fae2cf8507f5feb90dbb6cdada04',
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      var codes_arr = result.data.content.shipment_order_volume_array;
      var codes = '';
      codes_arr.forEach(function(item, index){
        codes = codes+item.tracking_code+' ';
      })
      codes = codes.replace(/\s+$/, '');
      response.status(200).json({
          tracking_code: codes
      });
    });
  } catch (error) {
    console.log('Could not get' + error);
    response.status(200).send('Could not get response from external API ' + error);
  }
});

module.exports = router;




