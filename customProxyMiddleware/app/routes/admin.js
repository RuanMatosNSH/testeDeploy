const axiConfig = require('../../utils/OCCToken');
const express = require('express');
var router = express.Router();
const nconf = require('nconf');

const HOST = nconf.get('atg.server.admin.url') ? String(nconf.get('atg.server.admin.url')).replace('/zaxy', '') : 'https://admin:admin@a7727193c1tst-admin.occa.ocs.oraclecloud.com'
const ENV = '/ccadmin/v1/';

router.get('/v1/*', function (request, response) {
  var fullUrl = HOST + ENV + request.originalUrl
    .replace(/\/ccstorex\/custom\/public\/v1\//g, '');

  try {
    axiConfig({
      method: 'GET',
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      headers: { 'X-CCAsset-Language': 'pt_BR' } // optional
    }).then((result) => {
      response.json(result);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

router.put('/v1/*', function (request, response) {
  var fullUrl = HOST + ENV + request.originalUrl
    .replace(/\/ccstorex\/custom\/public\/v1\//g, '');

  try {
    axiConfig({
      method: 'PUT',
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      data: request.body,
      headers: { 'X-CCAsset-Language': 'pt_BR' } // optional
    }).then((result) => {
      response.json(result);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

router.post('/v1/*', function (request, response) {
  var fullUrl = HOST + ENV + request.originalUrl
    .replace(/\/ccstorex\/custom\/public\/v1\//g, '');

  try {
    axiConfig({
      method: 'POST',
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      data: request.body,
      headers: { 'X-CCAsset-Language': 'pt_BR' } // optional
    }).then((result) => {
      response.json(result);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

router.delete('/v1/*', function (request, response) {
  var fullUrl = HOST + ENV + request.originalUrl
    .replace(/\/ccstorex\/custom\/public\/v1\//g, '');

  try {
    axiConfig({
      method: 'DELETE',
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      headers: { 'X-CCAsset-Language': 'pt_BR' } // optional
    }).then((result) => {
      response.json(result);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

router.options('/v1/*', function (request, response) {
  var fullUrl = HOST + ENV + request.originalUrl
    .replace(/\/ccstorex\/custom\/public\/v1\//g, '');

  try {
    axiConfig({
      method: 'OPTIONS',
      rejectUnauthorized: false, // Avoid SSL Conflict
      url: fullUrl,
      data: request.body,
      headers: { 'X-CCAsset-Language': 'pt_BR' } // optional
    }).then((result) => {
      response.json(result);
    }).catch((err) => {
      response.status(404).send('Could not get response from external API ' + err);
    });
  } catch (error) {
    console.log('Could not get' + error);
  }
});

module.exports = router;
