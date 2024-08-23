const express = require("express");
const router = express.Router();
const UploadFile = require("../controllers/UploadFile");
const DeleteFile = require("../controllers/DeleteFile");
const env = require("../utils/EnvironmentVariables");
const googleCloudStorageBucket = require("../services/googleCloudStorage");
const multer = require("multer");
const upload = multer().single("fileImage");
const logger = require("../utils/logger");

router.get("/verify-connection", async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      googleCloudStorageBucket,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      googleCloudStorageBucket,
    });
  }
});

router.post("/upload-file", async (req, res) => {
  const { destPathName, destFileName } = req.query;

  upload(req, res, async function () {
    try {
      await UploadFile.sendDoc(destPathName, destFileName, req.file);
      return res.status(env.HTTP_CODE_SUCCESS).json({
        message: "File upload successfuly",
      });
    } catch (err) {
      res.status(env.HTTP_CODE_ERROR).json({
        success: false,
        message: err && err.message,
      });
    }
  });
});

router.delete("/delete-file", async (req, res) => {
  try {
    const { fileName } = req.query;
    const filePayload = await DeleteFile.deleteDoc(fileName);

    return res.status(env.HTTP_CODE_SUCCESS).json({
      message: filePayload,
      success: true,
    });
  } catch (err) {
    res.status(env.HTTP_CODE_ERROR).json({
      success: false,
      message: err.message || env.ERROR_MESSAGE_SERVICE,
    });
  }
});

//Rota somente para testes, não é utilizada em produção
//const DownloadFile = require("../controllers/DownloadFile");

// router.get("/download-file", async (req, res) => {
//   try {
//     const { destFilePath, pathName, fileName } = req.query;

//     // if (!DownloadFile.validateParameters(req)) {
//     //   return res.status(env.HTTP_CODE_BAD_REQUEST).json({
//     //     success: false,
//     //     message: env.ERROR_MESSAGE_VALIDATION,
//     //     errorCode: env.ERROR_CODE_VALIDATION,
//     //   });
//     // }

//     const filePayload = await DownloadFile.getDoc(
//       destFilePath,
//       pathName,
//       fileName
//     );

//     return res.status(env.HTTP_CODE_SUCCESS).json(filePayload);
//   } catch (err) {
//     res.status(env.HTTP_CODE_ERROR).json({
//       success: false,
//       message: env.ERROR_MESSAGE_SERVICE,
//     });
//   }
// });

router.get("/", (req, res) => {
  res.status(200).send(env.ROUTE_TEST_MESSAGE);
});

module.exports = router;
