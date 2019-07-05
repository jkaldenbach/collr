const { assert } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const { ddb } = require("../src/models/db");
const eventService = require("../src/services/eventService");

beforeEach(async () => {
  // delete all existing records
  const events = await ddb
    .scan({ TableName: eventService.TABLE_NAME })
    .promise();

  if (!events.Count) return;
  const deleteBatch = events.Items.map(event => ({
    DeleteRequest: {
      Key: { partitionKey: event.partitionKey, sortKey: event.sortKey }
    }
  }));
  await ddb
    .batchWriteItem({
      RequestItems: { [eventService.TABLE_NAME]: deleteBatch }
    })
    .promise();
});

global.assert = assert;
global.request = function(method, url) {
  return request(app)
    [method](url)
    .set("Content-Type", "application/json");
};
