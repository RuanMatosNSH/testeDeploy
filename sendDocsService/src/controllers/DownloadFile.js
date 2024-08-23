const storage = require("../services/googleCloudStorage");
const { BUCKET_NAME } = require("../constants/googleCloud");

class DownloadFile {
  validateParameters(req) {
    return (
      req.query &&
      req.query.destFilePath &&
      req.query.pathName &&
      req.query.fileName
    );
  }
  async getDoc(destFilePath, pathName, fileName) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          destination: __dirname + "/teste.png",
        };
        const downloadFile = await storage
          .bucket(BUCKET_NAME)
          .file(fileName)
          .download(options);
        resolve(downloadFile);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new DownloadFile();
