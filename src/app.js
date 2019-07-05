const bodyParser = require("body-parser");
const express = require("express");

const eventController = require("./controllers/eventController");

const app = express();
app.use(bodyParser.json());
app.get("/status", (req, res) => {
  res.json({ ok: true });
});

app.post("/event", eventController.postEvent);
app.get("/event/:partitionKey", eventController.getEventsByPartitionKey);

module.exports = app;
