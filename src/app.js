const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());
app.get("/status", (req, res) => {
  res.json({ ok: true });
});

module.exports = app;
