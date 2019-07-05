const { ddb } = require("../models/db");

const TABLE_NAME = "code-challenge-203";

/**
 * add a new event to the database
 *
 * @param {Object} event - the event to be saved
 * @param {string} event.partitionKey - collar id
 * @param {string} event.sortKey - event id
 * @param {string} event.eventType - type of event ("activity"|"bark"|"location")
 * @param {object} event.metadata - extra data from the event. will be stored as strings
 *
 * @return {Promise} DynamoDB putItem result
 */
function createEvent(event) {
  return ddb
    .putItem({
      TableName: TABLE_NAME,
      Item: {
        partitionKey: {
          S: event.partitionKey
        },
        sortKey: {
          S: event.sortKey
        },
        eventType: {
          S: event.eventType
        },
        metadata: {
          M: Object.entries(event.metadata).reduce((acc, [key, val]) => {
            acc[key] = { S: val };
            return acc;
          }, {})
        }
      }
    })
    .promise();
}

/**
 * query events by collar id
 *
 * @param {string} partitionKey - id of the collar
 *
 * @return {Promise} array of events
 */
function getEventsByPartitionKey(partitionKey) {
  return ddb
    .scan({
      TableName: TABLE_NAME,
      ExpressionAttributeValues: {
        ":a": { S: partitionKey }
      },
      FilterExpression: "partitionKey = :a"
    })
    .promise();
}

module.exports = {
  TABLE_NAME,
  createEvent,
  getEventsByPartitionKey
};
