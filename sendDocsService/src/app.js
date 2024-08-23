"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const HandleFileRoutes = require("./routes/HandleFileRoutes");
const path = require("path");
const logsRoutes = require("./controllers/logs");
const cors = require("cors");

var app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/v1/handleDocServicev3", HandleFileRoutes);
app.use("/v1/logsService", logsRoutes);

module.exports = app;
