const eventService = require("../services/eventService");

/**
 * POST /event
 *
 * create an event
 *
 * @param {Event} req.body
 * @return {Event} the created event
 */
function postEvent(req, res, next) {
  return eventService
    .createEvent(req.body)
    .then(event => {
      res.status(201).json(event);
    })
    .catch(next);
}

/**
 * GET /event/:partitionKey
 *
 * list events by partitionKey
 *
 * @param {string} req.params.partitionKey - collar id
 * @return {Event[]} array of events
 */
function getEventsByPartitionKey(req, res, next) {
  return eventService
    .getEventsByPartitionKey(req.params.partitionKey)
    .then(events => {
      res.status(200).json(events);
    })
    .catch(next);
}

module.exports = {
  postEvent,
  getEventsByPartitionKey
};
