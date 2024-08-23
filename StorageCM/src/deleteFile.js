const { Storage } = require("@google-cloud/storage");

console.log("Start");


const bucketName = "dcg-conexao-melissa";
const pathName = "pathTest/";
const fileName = "file.txt";

const storage = new Storage({ keyFilename: "keys/gcp-dcg-occ-cm-key.json" });


async function deleteFile() {
  await storage.bucket(bucketName).file(pathName + fileName).delete();

  console.log(`gs://${bucketName}/${pathName + fileName} deleted`);
}

deleteFile().catch(console.error);

console.log("End");
