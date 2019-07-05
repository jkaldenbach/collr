const { assert } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const Event = require("../src/models/Event");

beforeEach(async () => {
  // delete all existing records
  const events = await Event.scan().exec();

  if (!events.count) return;
  const deleteBatch = events.map(({ partitionKey, sortKey }) => ({
    partitionKey,
    sortKey
  }));
  await Event.batchDelete(deleteBatch);
});

global.assert = assert;
global.request = function(method, url) {
  return request(app)
    [method](url)
    .set("Content-Type", "application/json");
};
