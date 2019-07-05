const Event = require("../models/Event");

const TABLE_NAME = Event.getTableReq().TableName;

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
  return Event.create(event);
}

/**
 * query events by collar id
 *
 * @param {string} partitionKey - id of the collar
 *
 * @return {Promise} array of events
 */
function getEventsByPartitionKey(partitionKey) {
  return Event.scan("partitionKey")
    .eq(partitionKey)
    .exec();
}

module.exports = {
  TABLE_NAME,
  createEvent,
  getEventsByPartitionKey
};
