const app = require("./app");
const config = require("./config/config");
const logger = require("./logger");

app.listen(config.port, config.host, () => {
  logger.info(`server running at http://${config.host}:${config.port}`);
});
