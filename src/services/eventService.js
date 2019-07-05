const Event = require("../models/Event");

const TABLE_NAME = Event.getTableReq().TableName;

/**
 * add a new event to the database
 *
 * @param {Event} event - the event to be saved
 *
 * @return {Promise<Event>} the created event
 */
function createEvent(event) {
  return Event.create(event);
}

/**
 * query events by collar id
 *
 * @param {string} partitionKey - id of the collar
 *
 * @return {Promise<Event[]>} array of events
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
