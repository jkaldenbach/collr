const dynamoose = require("dynamoose");

const secrets = require("../config/secrets");

dynamoose.AWS.config.update({
  accessKeyId: secrets.awsAccessKeyId,
  secretAccessKey: secrets.awsSecretAccessKey,
  region: secrets.awsRegion
});

const ddb = new dynamoose.AWS.DynamoDB({
  apiVersion: "2012-08-10",
  sslEnabled: true
});
dynamoose.setDDB(ddb);

module.exports = {
  dynamoose,
  ddb
};
