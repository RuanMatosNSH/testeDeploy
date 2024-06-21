import { app } from "./app";

const PORT = process.env.PORT || 8005;

app.listen(PORT, () => {
  console.log(`SERVER => Server listening on port ${PORT}`);
  console.log(`SERVER => Server base rout http://127.0.0.1:8005/v1/{route}`);
});

module.exports = app;
