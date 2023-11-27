const express = require('express');
const axios = require('axios');
var router = express.Router();
const axiConfig = require('../../utils/OCCProxyAxiosRequester');

router.get('/legacyCnpj', async function (request, response) {
  try {
    const responseSC = await axiConfig.get('https://na1.ai.dm-us.informaticacloud.com/active-bpel/public/rt/gKlSdumC0iIjZgAY6sxzAX/p_Check_If_Emitente_Exists', {
      params: {
        gren_cnpj: request.query.cnpj
      },
      rejectUnauthorized: false,
    });

    response.status(200).json(responseSC.data);

  } catch (error) {
    console.log('Could not get' + error);
    response.status(200).send('Could not get response from external API ' + error);
  }
});

router.post('/legacyCnpjSend', async function (request, response) {
  try {
    var url = 'https://email-sending-iy5kvap7oa-uc.a.run.app/b2b/legacyCnpj';
    axios({
      headers: { 'Authorization': 'Basic ZGVmYXVsdDplbWFpbHNlbmRlcjIwMjA=' },
      method: 'POST',
      url: url,
      data: {
        sentEmail: request.body.sentEmail,
        nomeSite: request.body.nomeSite,
        cnpjCliente: request.body.cnpjCliente,
        telefoneCliente: request.body.telefoneCliente,
        emailCliente: request.body.emailCliente,
      },
      rejectUnauthorized: false,
    }).then((result) => {
      response.status(204).send();
    });

  } catch (error) {
    console.log('Could not get' + error);
    response.status(200).send('Could not get response from external API ' + error);
  }
});

module.exports = router;




