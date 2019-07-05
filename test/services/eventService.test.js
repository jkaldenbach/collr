const Event = require("../../src/models/Event");

const eventService = require("../../src/services/eventService");

describe("eventService", () => {
  describe(".createEvent", () => {
    it("creates an event record", async () => {
      const newEvent = {
        partitionKey: "collar1",
        sortKey: `event${Date.now()}`,
        eventType: "location",
        metadata: {
          lat: "12345678",
          long: "12345678"
        }
      };
      await eventService.createEvent(newEvent);
      const createdEvent = await Event.get({
        partitionKey: newEvent.partitionKey,
        sortKey: newEvent.sortKey
      });
      assert.equal(createdEvent.eventType, newEvent.eventType);
      assert.deepEqual(createdEvent.metadata.lat, newEvent.metadata.lat);
      assert.deepEqual(createdEvent.metadata.long, newEvent.metadata.long);
    });
  });

  describe(".getEventsByPartitionKey", () => {
    it("lists all events", async () => {
      await eventService.createEvent({
        partitionKey: "collar1",
        sortKey: "1",
        eventType: "location",
        metadata: { lat: "1", long: "2" }
      });
      await eventService.createEvent({
        partitionKey: "collar1",
        sortKey: "2",
        eventType: "location",
        metadata: { lat: "1", long: "2" }
      });
      await eventService.createEvent({
        partitionKey: "collar2",
        sortKey: "1",
        eventType: "location",
        metadata: { lat: "1", long: "2" }
      });
      const events = await eventService.getEventsByPartitionKey("collar1");
      assert.equal(events.count, 2);
      events.forEach(event => {
        assert(event.partitionKey, "collar1");
      });
    });
  });
});
