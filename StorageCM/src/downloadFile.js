const { Storage } = require("@google-cloud/storage");

console.log("Start");


const bucketName = "dcg-conexao-melissa";
const pathName = "pathtest/";
const fileName = "file.txt";

const destFilePath = "assets/fileDownloaded.txt";

const storage = new Storage({ keyFilename: "keys/gcp-dcg-occ-cm-key.json" });


async function downloadFile() {
  const options = {
    destination: destFilePath,
  };

  // Downloads the file
  await storage.bucket(bucketName).file(pathName + fileName).download(options);

  console.log(
    `gs://${bucketName}/${pathName + fileName} downloaded to ${destFilePath}.`
  );
}

downloadFile().catch(console.error);

console.log("End");
