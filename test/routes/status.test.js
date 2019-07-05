describe("/status", () => {
  it("is okay", async () => {
    const resp = await request("get", "/status");
    assert.equal(resp.status, 200);
    assert.equal(resp.body.ok, true);
  });
});
