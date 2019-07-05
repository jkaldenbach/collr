const { ddb } = require("../../src/models/db");

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
      const createdEvent = await ddb
        .getItem({
          TableName: eventService.TABLE_NAME,
          Key: {
            partitionKey: { S: newEvent.partitionKey },
            sortKey: { S: newEvent.sortKey }
          }
        })
        .promise();
      assert.equal(createdEvent.Item.eventType.S, newEvent.eventType);
      assert.deepEqual(
        createdEvent.Item.metadata.M.lat.S,
        newEvent.metadata.lat
      );
      assert.deepEqual(
        createdEvent.Item.metadata.M.long.S,
        newEvent.metadata.long
      );
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
      assert.equal(events.Count, 2);
      events.Items.forEach(event => {
        assert(event.partitionKey.S, "collar1");
      });
    });
  });
});
