const { Storage } = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join(__dirname, "./gcp-dcg-occ-cm-key.json");

const storage = new Storage({
  projectId: "grendene-digital-commerce",
  keyFilename: serviceKey,
  timeout: 2500,
});

module.exports = storage;
