const AWS = require("aws-sdk");

const secrets = require("../config/secrets");

AWS.config.update({
  accessKeyId: secrets.awsAccessKeyId,
  secretAccessKey: secrets.awsSecretAccessKey,
  region: secrets.awsRegion
});

module.exports = {
  AWS,
  ddb: new AWS.DynamoDB({ apiVersion: "2012-08-10", sslEnabled: true })
};
