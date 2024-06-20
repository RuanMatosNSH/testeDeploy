const express = require("express");
const router = express.Router();
const axiConfig = require("../../utils/StoreCreditToken");
const axios = require("axios");

router.get("/history", async function (request, response) {
  try {
    const siteId = request.query.siteId;
    const profileEmail = request.query.profileEmail;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/record",
      {
        params: {
          siteId: siteId,
          profileEmail: profileEmail,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/historycpf", async function (request, response) {
  try {
    const siteId = request.query.siteId;
    const profileCpfCnpj = request.query.profileCpfCnpj;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/recordcpf",
      {
        params: {
          siteId: siteId,
          profileCpfCnpj: profileCpfCnpj,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/balance", async function (request, response) {
  try {
    const { siteId, profileEmail } = request.query;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/balance",
      {
        params: {
          siteId,
          profileEmail,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/balancecpf", async function (request, response) {
  try {
    const { siteId, profileCpfCnpj } = request.query;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/balancecpf",
      {
        params: {
          siteId,
          profileCpfCnpj,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/validateBalance", async function (request, response) {
  try {
    const { siteId, profileEmail } = request.query;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/balance",
      {
        params: {
          siteId,
          profileEmail,
          delayTime: 5,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/validateBalancecpf", async function (request, response) {
  try {
    const { siteId, profileCpfCnpj } = request.query;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/balancecpf",
      {
        params: {
          siteId,
          profileCpfCnpj,
          delayTime: 5,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/v1/history", async function (request, response) {
  try {
    const siteId = request.query.siteId;
    const token = request.headers.authorization?.split(" ")[1];

    const userData = await getUserData(token, siteId);
    const profileEmail = userData.email;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/record",
      {
        params: {
          siteId: siteId,
          profileEmail: profileEmail,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/v1/historycpf", async function (request, response) {
  try {
    const siteId = request.query.siteId;
    const token = request.headers.authorization?.split(" ")[1];
    const userData = await getUserData(token, siteId);

    if (!userData?.dynamicProperties)
      return response.status(400).json({
        message: "Could not find user",
      });
    const profileCpfCnpj = userData.dynamicProperties.find(
      (o) => o.id === "gren_cpf"
    ).value;
    if (!profileCpfCnpj)
      return response.status(400).json({
        message: "Não foi possível selecionar o CPF do usuário",
      });

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/recordcpf",
      {
        params: {
          siteId: siteId,
          profileCpfCnpj: profileCpfCnpj,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/v1/balance", async function (request, response) {
  const STORE_CREDIT_HOST_DOMAIN = process.env.STORE_CREDIT_HOST_DOMAIN;
  try {
    const { siteId } = request.query;
    const token = request.headers.authorization?.split(" ")[1];

    const userData = await getUserData(token, siteId);
    if (!userData?.email)
      response.status(400).json({
        message: "Could not find user",
      });
    const profileEmail = userData.email;
    const responseSC = await axiConfig.get(
      STORE_CREDIT_HOST_DOMAIN + "/balance",
      {
        params: {
          siteId,
          profileEmail,
        },
        rejectUnauthorized: false,
      }
    );
    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/v1/balancecpf", async function (request, response) {
  const STORE_CREDIT_HOST_DOMAIN = process.env.STORE_CREDIT_HOST_DOMAIN;
  try {
    const { siteId } = request.query;
    const token = request.headers.authorization?.split(" ")[1];
    const userData = await getUserData(token, siteId);

    if (!userData?.dynamicProperties)
      return response.status(400).json({
        message: "Could not find user",
      });
    const profileCpfCnpj = userData.dynamicProperties.find(
      (o) => o.id === "gren_cpf"
    ).value;
    if (!profileCpfCnpj)
      return response.status(400).json({
        message: "Não foi possível selecionar o CPF do usuário",
      });

    const responseSC = await axiConfig.get(
      STORE_CREDIT_HOST_DOMAIN + "/balancecpf",
      {
        params: {
          siteId,
          profileCpfCnpj,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/v1/validateBalance", async function (request, response) {
  try {
    const { siteId } = request.query;
    const token = request.headers.authorization?.split(" ")[1];
    const userData = await getUserData(token, siteId);
    const profileEmail = userData.email;

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/balance",
      {
        params: {
          siteId,
          profileEmail,
          delayTime: 5,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

router.get("/v1/validateBalancecpf", async function (request, response) {
  try {
    const { siteId } = request.query;
    const token = request.headers.authorization?.split(" ")[1];
    const userData = await getUserData(token, siteId);

    if (!userData?.dynamicProperties)
      return response.status(400).json({
        message: "Could not find user",
      });
    const profileCpfCnpj = userData.dynamicProperties.find(
      (o) => o.id === "gren_cpf"
    ).value;
    if (!profileCpfCnpj)
      return response.status(400).json({
        message: "Não foi possível selecionar o CPF do usuário",
      });

    const responseSC = await axiConfig.get(
      process.env.STORE_CREDIT_HOST_DOMAIN + "/balancecpf",
      {
        params: {
          siteId,
          profileCpfCnpj,
          delayTime: 5,
        },
        rejectUnauthorized: false,
      }
    );

    response.status(200).json(responseSC.data);
  } catch (error) {
    let requestMessage = "";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      requestMessage = error.response.data.message;
    }

    response.status(400).json({
      message: "Could not get response from external API",
      error: error.message ? error.message : "",
      requestMessage: requestMessage,
    });
  }
});

const getUserData = async (accessToken, siteId) => {
  try {
    const list = await axios.get(
      process.env.OCC_URL_STORE +
        "/ccstore/v1/profiles/current?filterKey=OSFCurrentProfile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-CCAsset-Language": "pt-BR",
          "x-ccsite": siteId,
        },
      }
    );

    console.error("aqui getUserData ", list.data);
    return list.data;
  } catch (error) {
    console.error("getUserData ", error);
    return {};
  }
};

module.exports = router;
