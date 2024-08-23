const { BUCKET_NAME } = require("../constants/googleCloud");
const storage = require("../services/googleCloudStorage");
const googleCloudAxiosClient = require("../services/googleCloudAxiosClient");

class DeleteFile {
  validateParameters(fileName) {
    if (!fileName) throw new Error("The parameter filename is required");
  }

  async deleteDoc(fileName) {
    this.validateParameters(fileName);

    try {
      const [url] = await storage
        .bucket(BUCKET_NAME)
        .file(fileName)
        .getSignedUrl({
          action: "delete",
          version: "v4",
          expires: Date.now() + 15 * 60 * 1000,
        });

      await googleCloudAxiosClient.delete(url);
      return `gs://${BUCKET_NAME}/${fileName} deleted`;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}

module.exports = new DeleteFile();
