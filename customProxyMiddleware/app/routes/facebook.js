const express = require("express");
const router = express.Router();
const axiosOccProxy = require("../../utils/OCCProxyAxiosRequester");

const FACEBOOK_HOST_DOMAIN =
    process.env.FACEBOOK_HOST_DOMAIN ||
    "https://gateway-facebook-tst-iy5kvap7oa-uc.a.run.app";
const FACEBOOK_AUTHORIZATION_TOKEN =
    process.env.FACEBOOK_AUTHORIZATION_TOKEN ||
    "ZGVmYXVsdDpmZWVkdXBkYXRlcjIwMjA=";
const FACEBOOK_TEST_CODE = process.env.FACEBOOK_TEST_CODE || "TEST81399";

router.post("/sendevent", async function (req, res) {
    try {
        const siteId = req.query.siteId;
        let payload = req.body;

        const userAgent = req.get("User-Agent");
        const clientIpAddress =
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        payload.data.forEach((item) => {
            item.user_data.client_user_agent = userAgent;
            item.user_data.client_ip_address = clientIpAddress;
        });

        if (FACEBOOK_TEST_CODE) payload.test_event_code = FACEBOOK_TEST_CODE; // parâmetro pra testes

        try {
            const response = await axiosOccProxy({
                method: "POST",
                url: `${FACEBOOK_HOST_DOMAIN}/facebook/sendevent/${siteId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${FACEBOOK_AUTHORIZATION_TOKEN}`,
                    rejectUnauthorized: false, // Avoid SSL Conflict
                },
                data: payload,
            });

            res.status(200).json(response.data);
        } catch (error) {
            if (error.response && error.response.status)
                res.status(error.response.status).send(
                    "Could not get response from external API " + error
                );
        }
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

        res.status(400).json({
            message: "Could not get response from external API",
            error: error.message ? error.message : "",
            requestMessage: requestMessage,
        });
    }
});

router.post("/v1/sendevent", async function (req, res) {
    try {
        const siteId = req.query.siteId;
        let payload = req.body;

        const userAgent = req.get("User-Agent");
        const clientIpAddress =
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        payload.data.forEach((item) => {
            item.user_data.client_user_agent = userAgent;
            item.user_data.client_ip_address = clientIpAddress;
        });

        if (FACEBOOK_TEST_CODE) payload.test_event_code = FACEBOOK_TEST_CODE; // parâmetro pra testes

        axiosOccProxy({
            method: "POST",
            url: `${FACEBOOK_HOST_DOMAIN}/facebook/sendevent/${siteId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${FACEBOOK_AUTHORIZATION_TOKEN}`,
                rejectUnauthorized: false, // Avoid SSL Conflict
            },
            data: payload,
        })
            .then((response) => {
                res.status(200).json(response.data);
            })
            .catch((err) => {
                if (err.response && err.response.status)
                    res.status(err.response.status).send(
                        "Could not get response from external API " + err
                    );
            });
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

        res.status(400).json({
            message: "Could not get response from external API",
            error: error.message ? error.message : "",
            requestMessage: requestMessage,
        });
    }
});
router.post("/v2/sendevent", async function (req, res) {
    try {
        const siteId = req.query.siteId;
        let payload = req.body;

        const userAgent = req.get("User-Agent");
        const clientIpAddress =
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        payload.data.forEach((item) => {
            item.user_data.client_user_agent = userAgent;
            item.user_data.client_ip_address = clientIpAddress;
        });

        if (FACEBOOK_TEST_CODE) payload.test_event_code = FACEBOOK_TEST_CODE; // parâmetro pra testes

        axiosOccProxy({
            method: "POST",
            url: `${FACEBOOK_HOST_DOMAIN}/facebook/sendevent/${siteId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${FACEBOOK_AUTHORIZATION_TOKEN}`,
                rejectUnauthorized: false, // Avoid SSL Conflict
            },
            data: payload,
        })
            .then((response) => {
                res.status(200).json(response.data);
            })
            .catch((err) => {
                if (err.response && err.response.status)
                    res.status(err.response.status).send(
                        "Could not get response from external API " + err
                    );
            });
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

        res.status(400).json({
            message: "Could not get response from external API",
            error: error.message ? error.message : "",
            requestMessage: requestMessage,
        });
    }
});
router.post("/v3/sendevent", async function (req, res) {
    try {
        const siteId = req.query.siteId;
        let payload = req.body;

        const userAgent = req.get("User-Agent");
        const clientIpAddress =
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        payload.data.forEach((item) => {
            item.user_data.client_user_agent = userAgent;
            item.user_data.client_ip_address = clientIpAddress;
        });

        if (FACEBOOK_TEST_CODE) payload.test_event_code = FACEBOOK_TEST_CODE; // parâmetro pra testes

        axiosOccProxy({
            method: "POST",
            url: `${FACEBOOK_HOST_DOMAIN}/facebook/sendevent/${siteId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${FACEBOOK_AUTHORIZATION_TOKEN}`,
                rejectUnauthorized: false, // Avoid SSL Conflict
            },
            data: payload,
        })
            .then((response) => {
                res.status(200).json(response.data);
            })
            .catch((err) => {
                if (err.response && err.response.status)
                    res.status(err.response.status).send(
                        "Could not get response from external API " + err
                    );
            });
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

        res.status(400).json({
            message: "Could not get response from external API",
            error: error.message ? error.message : "",
            requestMessage: requestMessage,
        });
    }
});

router.get("/health", (request, response) => {
    return response.json({
        message: "Service Up and Running",
    });
});

module.exports = router;
