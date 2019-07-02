const { assert } = require("chai");
const request = require("supertest");

const app = require("../src/app");

before(() => {
  // TODO: connect to database
});

beforeEach(() => {
  // TODO: drop database
});

after(() => {
  // TODO: disconnect from database
});

global.assert = assert;
global.request = function(method, url) {
  return request(app)
    [method](url)
    .set("Content-Type", "application/json");
};
