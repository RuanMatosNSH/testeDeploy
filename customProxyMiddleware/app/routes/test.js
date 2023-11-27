'use strict';
const axiConfig = require('../../utils/OCCProxyAxiosRequester');
const axios = require('axios');
const express = require('express');
var router = express.Router();

// const nconf = require('nconf');
// const NodeCache = require('node-cache');
// const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// const ENV = 'ccadmin/v1';

// const basicAuth = require('express-basic-auth');

// router.use(basicAuth({
//   users: { 'occ': 'kerito123' }
// }));

router.post('/external/proxy/shippingHook', function (request, response, time) {
  try {
    axiConfig({
      method: 'POST',
      url: 'https://demo0263231.mockable.io/shippingCalculator',
      rejectUnauthorized: false
    }).then((result) => {
      response.json(result.data);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

router.post('/external/simple/shippingHook', function (request, response, time) {
  try {
    axios({
      method: 'POST',
      url: 'https://demo0263231.mockable.io/shippingCalculator',
      rejectUnauthorized: false
    }).then((result) => {
      response.json(result.data);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

router.post('/internal/shippingHook', function (request, response, time) {
  response.json({
    shippingMethods: [
      {
        eligibleForProductWithSurcharges: false,
        estimatedDeliveryDateGuaranteed: false,
        internationalDutiesTaxesFees: '0.00',
        shippingCost: 30.00,
        displayName: 'Entrega SSE',
        shippingMethodId: '400001',
        estimatedDeliveryDate: '2019-08-24',
        shippingTotal: 30.00,
        shippingTax: '0.00',
        deliveryDays: 2,
        currency: 'BRL',
        taxcode: 299,
        carrierId: 'ON'
      }
    ]
  });
});

router.get('/login', function (request, response, time) {
  // console.log('Test Console', time());
  try {
    axios({
      method: 'POST',
      url: process.env.GRENDENE_OLD_ORDERS_TOKEN_HOST_DOMAIN,
      headers: { Authorization: process.env.GRENDENE_OLD_ORDERS_TOKEN },
      rejectUnauthorized: false // Avoid SSL Conflict
    }).then((result) => {
      response.json(result.data.token);
    }).catch((err) => {
      response.status(404).send('Could not login' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

// router.route('/').get(function (req, res) {
//   let occServer = nconf.get('atg.server') || '';
//   console.log('OCC INSTANCE INFO -----------------------------');
//   console.log(occServer);
//   res.json(req.headers);
// });

// router.get('/cache', function (request, response, time) {
//   try {
//     var cachedInfo = myCache.get('occ', true);
//   } catch (error) {
//     myCache.set('occ', { cached: true }, 10000);
//   }
//   // console.log('cachedInfo ', cachedInfo);
//   response.json(cachedInfo);
//   // if (!cachedInfo) myCache.set('occ', { cached: true }, 10000);
// });

// router.post('/shippingHook', function (request, response, time) {
//   // console.log('Test Console', time());
//   response.json({
//     'shippingMethods': [
//       {
//         'eligibleForProductWithSurcharges': false,
//         'estimatedDeliveryDateGuaranteed': false,
//         'internationalDutiesTaxesFees': '0.00',
//         'shippingCost': 30.00,
//         'displayName': 'Entrega SSE',
//         'shippingMethodId': '400001',
//         'estimatedDeliveryDate': '2019-08-24',
//         'shippingTotal': 30.00,
//         'shippingTax': '0.00',
//         'deliveryDays': 2,
//         'currency': 'BRL',
//         'taxcode': 299,
//         'carrierId': 'ON'
//       }
//     ]
//   });
// });

// router.get('/restApi', function (request, response, time) {
//   // console.log('Test Console', time());
//   try {
//     axiosProxy({
//       method: 'get',
//       url: 'https://api.darksky.net/forecast/f2cf1d7cd0dc5f6541c729fbee6ff212/37.8267,-122.4233'
//     }).then((result) => {
//       // console.log(result.data);
//       response.json(result.data);
//     }).catch((err) => {
//       response.status(404).send('Could not get response from external API ' + err);
//     });
//   } catch (error) {
//     console.log('Could not get' + error);
//   }
// });

module.exports = router;
