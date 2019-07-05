/**
 * @typedef Event
 * @property {string} partitionKey - collar id
 * @property {string} sortKey - event id
 * @property {string} eventType - type of event ("activity"|"bark"|"location")
 * @property {object} metadata - extra data from the event. will be stored as strings
 */

const { dynamoose } = require("./db");

const EVENT_TYPE = {
  ACTIVITY: "activity",
  BARK: "bark",
  LOCATION: "location"
};

const eventSchema = new dynamoose.Schema(
  {
    partitionKey: { type: String, hashKey: true },
    sortKey: { type: String, rangeKey: true },
    eventType: { type: String, enum: Object.values(EVENT_TYPE) },
    metadata: { type: Map, map: {} }
  },
  {
    useDocumentTypes: true,
    saveUnknown: ["metadata"]
  }
);

const Event = dynamoose.model("code-challenge-203", eventSchema);

module.exports = Event;
