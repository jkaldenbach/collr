const Event = require("../../src/models/Event");

describe("/event", () => {
  describe("POST /event", () => {
    it("creates an event record", async () => {
      const resp = await request("post", "/event").send({
        partitionKey: "collar1",
        sortKey: "event1",
        type: "bark",
        metadata: { intensity: "65" }
      });
      assert.equal(resp.status, 201);
      assert.deepEqual(resp.body, {
        partitionKey: "collar1",
        sortKey: "event1",
        type: "bark",
        metadata: { intensity: "65" }
      });
      const createdEvent = await Event.get({
        partitionKey: "collar1",
        sortKey: "event1"
      });
      assert.isOk(createdEvent);
    });
  });

  describe("GET /event/:partitionKey", () => {
    it("lists events for the partition key", async () => {
      await Event.create({
        partitionKey: "collar1",
        sortKey: "event1",
        type: "bark",
        metadata: { intensity: "65" }
      });
      await Event.create({
        partitionKey: "collar1",
        sortKey: "event2",
        type: "bark",
        metadata: { intensity: "65" }
      });
      await Event.create({
        partitionKey: "collar2",
        sortKey: "event1",
        type: "bark",
        metadata: { intensity: "65" }
      });
      const resp = await request("get", "/event/collar1");
      assert.equal(resp.status, 200);
      assert.equal(resp.body.length, 2);
    });
  });
});
