const express = require('express');
const axios = require('axios');
const axiosOccProxy = require("../../utils/OCCProxyAxiosRequester");
var router = express.Router();



router.post('/combinations', async function (request, response) {
  try {
    axiosOccProxy({
      method: 'POST',
      url: process.env.HUB_COMBINATIONS_HOST_DOMAIN,
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'X-API-Key': process.env.HUB_COMBINATIONS_AUTH_TOKEN
      },
      crossDomain: true,
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

router.get('/stores', async function (request, response) {
  const { postalCode, skuId, productId, siteId } = request.query;
  try {
    axiosOccProxy({
      method: 'GET',
      url: process.env.HUB_STORES_HOST_DOMAIN,
      headers: {
        'Authorization': '',
        'X-API-Key': process.env.HUB_STORES_AUTH_TOKEN
      },
      params: {
        postalCode: postalCode,
        skuId: skuId,
        productId: productId,
        siteId: siteId
      },
      crossDomain: true,
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

router.post('/productSearch', async function (request, response) {
  try {
    axiosOccProxy({
      method: 'POST',
      url: process.env.HUB_PRODUCT_SEARCH_HOST_DOMAIN,
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'X-API-Key': process.env.HUB_PRODUCT_SEARCH_AUTH_TOKEN
      },
      crossDomain: true,
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

router.post('/shippingCosts', async function (request, response) {
  request.body.request.items = request.body.request.items.map((item) => {
    if (item.amount === 0) {
      item.amount = item.rawTotalPrice;
    }
    return item;
  });
  try {
    axiosOccProxy({
      method: 'POST',
      url: process.env.HUB_SHIPPING_COST_HOST_DOMAIN,
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'X-API-Key': process.env.HUB_SHIPPING_COST_AUTH_TOKEN
      },
      crossDomain: true,
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


router.get('/reviews', async function (request, response) {
  const { page, size, productId, siteId } = request.query;

  try {
    axiosOccProxy({
      method: 'GET',
      url: process.env.PRODUCT_REVIEW_HOST_DOMAIN,
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'X-API-Key': process.env.PRODUCT_REVIEW_AUTH_TOKEN
      },
      params: {
        'page': page || 1,
        'size': size || 10,
        'filter[product_id]': productId,
        'filter[site_id]': siteId
      },
      crossDomain: true,
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

router.get('/invoice', async function (request, response) {
  const { orderId } = request.query;

  var serviceURL = process.env.HUB_INVOICE_HOST_DOMAIN;
  serviceURL = serviceURL.replace('<orderId>', orderId);

  try {
    axiosOccProxy({
      method: 'GET',
      url: serviceURL,
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'X-API-Key': process.env.HUB_INVOICE_AUTH_TOKEN
      },
      crossDomain: true,
    }).then((result) => {
      const formatedData = [];

      if (result.data && result.data.length > 0) {
        const data = result.data;
        data.map(orderSplit => {
          const orderSplitFormated = {};
          orderSplitFormated.identificador_frete = orderSplit.identificador_frete;

          const notasFiscaisFormated = [];

          if (orderSplit.notas_fiscais && orderSplit.notas_fiscais.length > 0) {
            orderSplit.notas_fiscais.map(notaFiscal => {
              const notasFiscalFormated = {
                nfe_xml: notaFiscal.nfe_xml,
                numero: notaFiscal.numero,
                nfe_danfe_base64: notaFiscal.nfe_danfe_base64
              }

              notasFiscaisFormated.push(notasFiscalFormated);
            });

          }

          orderSplitFormated.notas_fiscais = notasFiscaisFormated;


          formatedData.push(orderSplitFormated);
        });
      }
      response.status(200).json(formatedData);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
    response.status(200).send('Could not get response from external API ' + error);
  }
});


module.exports = router;