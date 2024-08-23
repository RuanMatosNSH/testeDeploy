const { Storage } = require("@google-cloud/storage");

console.log("Start");

const filePath = "./assets/fileToUpload.txt";

const bucketName = "dcg-conexao-melissa";
const destPathName = "pathtest/";
const destFileName = "file.txt";

const storage = new Storage({ keyFilename: "keys/gcp-dcg-occ-cm-key.json" });

async function uploadFile() {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destPathName + destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);

console.log("End");
