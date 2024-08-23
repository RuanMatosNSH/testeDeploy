const env = require("../utils/EnvironmentVariables");
const storage = require("../services/googleCloudStorage");
const { BUCKET_NAME } = require("../constants/googleCloud");
const googleCloudAxiosClient = require("../services/googleCloudAxiosClient");
const logger = require("../utils/logger");

const FIVE_MEGABYTES = 5242880;
const acceptedImageFormats = ["image/png", "image/jpg"];

class UploadFile {
  validateFileFormat(file) {
    if (!(file.mimetype && file.mimetype.includes("image/"))) {
      throw new Error(
        "Invalid file format, the accepted formats are jpg and png"
      );
    }
  }

  validateRequiredParameters(destPathName, destFileName, file) {
    if (!destPathName || !destFileName || !file) {
      throw new Error(env.ERROR_MESSAGE_VALIDATION);
    }
  }

  validateFileSize(file) {
    if (file.size && file.size > FIVE_MEGABYTES) {
      throw new Error("file size exceeds the maximium accepted(5MB)");
    }
  }

  validateParameters(destPathName, destFileName, file) {
    this.validateRequiredParameters(destPathName, destFileName, file);
    this.validateFileFormat(file);
    this.validateFileSize(file);
  }

  async generateV4UploadSignedUrl(filename) {
    const options = {
      action: "write",
      version: "v4",
      expires: Date.now() + 15 * 60 * 1000,
      contentType: "text/plain",
    };

    const [url] = await storage
      .bucket(BUCKET_NAME)
      .file(filename)
      .getSignedUrl(options)
      .then();

    return url;
  }

  async sendDoc(destPathName, destFileName, file) {
    // logger.info(`file receveid in upload: ${JSON.stringify(file)}`);
    this.validateParameters(destPathName, destFileName, file);

    return new Promise(async (resolve, reject) => {
      try {
        console.log("path name file name", destPathName, destFileName);

        const signedUrl = await this.generateV4UploadSignedUrl(
          `${destPathName}/${destFileName}`
        );
        const response = await googleCloudAxiosClient.put(
          signedUrl,
          file.buffer,
          {
            headers: { "Content-Type": "text/plain" },
          }
        );

        resolve();
      } catch (err) {
        reject(err && err.message);
      }
    });
  }
}

module.exports = new UploadFile();
