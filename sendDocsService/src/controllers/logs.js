const express = require("express");
const router = express.Router();
let logger = require("../utils/logger");
let fs = require("fs");

function removeFile(res, next = false) {
  fs.readdir(logger.transports[1].dirname + "/", function (err, filenames) {
    if (err) {
      return;
    } else {
      filenames.forEach(function (filename) {
        let path = logger.transports[1].dirname + "/" + filename;
        fs.exists(path, function (exist) {
          if (exist) {
            fs.truncate(path, 0, function () {});
          }
        });
      });
      if (next) {
        return;
      } else {
        return res.status(200).json("OK");
      }
    }
  });
}

function getAllFiles() {
  return new Promise((resolve, reject) => {
    fs.readdir(logger.transports[1].dirname + "/", function (err, filenames) {
      if (err) {
        reject([]);
      } else {
        let files = [];
        filenames.forEach(function (filename) {
          fs.exists(
            logger.transports[1].dirname + "/" + filename,
            function (exist) {
              if (exist) {
                let file = {
                  filename: "",
                  lastmodified: new Date(),
                  contextPath: logger.transports[1].dirname,
                };
                file.filename = filename;
                files.push(file);
              }
            }
          );
        });
        resolve(files);
      }
    });
  });
}

function getSizeFile(path) {
  const stats = fs.statSync(path);
  const fileSizeInBytes = stats.size;
  const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
  return fileSizeInMegabytes;
}

function loadLogs(req, res) {
  try {
    let url = require("url");
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;

    let logToRemove = query.remove;
    if (
      logToRemove != null &&
      logToRemove != "" &&
      logToRemove != "undefined"
    ) {
      return removeFile(res);
    }

    if (logger.transports[1] && logger.transports[1].name == "file") {
      let logPath = query.path;
      if (logPath == null || logPath == "" || logPath == "undefined") {
        logPath =
          logger.transports[1].dirname + "/" + logger.transports[1].filename;
      }
      let sizeFile = getSizeFile(logPath);
      if (sizeFile > 100) {
        removeFile(res, true);
      }

      getAllFiles()
        .then((files) => {
          fs.exists(logPath, function (exist) {
            if (exist) {
              fs.readFile(logPath, "utf-8", function (error, data) {
                let lines = [];
                if (!error)
                  lines = data.split(
                    process.platform === "win32" ? "\r\n" : "\n"
                  );
                // return res.status(200).json(data);
                let logsToSend = [];
                lines = lines.filter((line) => line);
                try {
                  lines.forEach((line) => {
                    let newLine = { message: "", level: "" };
                    let data = JSON.parse(line);
                    let payload = data.message.trim().split("&&");
                    if (payload.length > 1) {
                      try {
                        newLine["message"] = payload[0].trim();
                        newLine["level"] = data.level;
                        newLine["payload"] = JSON.parse(payload[1].trim());
                        logsToSend.push(newLine);
                      } catch (err) {
                        logsToSend.push(data);
                      }
                    } else logsToSend.push(data);
                  });
                } catch (err) {
                  if (req.query.sse == "true") {
                    return res.status(200).json(lines);
                  }
                }
                if (req.query.sse == "true") {
                  res.status(200).json(logsToSend);
                } else {
                  // res.render("../app/views/logs", { lines: lines, files: files });
                }
              });
            } else {
              if (req.query.sse == "true") {
                res.status(200).json({ Erro: "Erro ao processar o arquivo" });
              } else {
                // res.render("../app/views/logs", { lines: [], files: files });
              }
            }
          });
        })
        .catch((error) => {
          logger.error("LogsRouter: - " + error);
          res.status(500).json("Error");
        });
    } else {
      // res.render("../src/views/logs", { lines: ["- && - && LOG BASEADO EM ARQUIVO DESATIVADO"], files: [] });
    }
  } catch (error) {
    logger.error("LogsRouter: - " + error);
    res.status(500).json("Error");
  }
}

router.get("/logs", loadLogs);
module.exports = router;
