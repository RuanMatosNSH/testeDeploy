import { app } from "./app";
import config from "./config";

if (config.localDevelopment === "yes") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`SERVER => Server listening on port ${PORT}`);
    console.log(`SERVER => Server base rout http://127.0.0.1:3000/v1/{route}`);
  });
}

module.exports = app;
