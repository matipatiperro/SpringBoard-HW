describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = "Alice";
  });

  it("should add a new server to allServers on submitServerInfo()", function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });
  it("should update table rows and data on updateServerTable()", function () {
    submitServerInfo();
    updateServerTable();

    const serverNameInput = document.getElementById("server1");

    expect(serverNameInput.cells[0].innerHTML).toEqual("Alice");
    expect(serverNameInput.cells[1].innerHTML).toEqual("$0.00");
  });

  afterEach(function () {
    // teardown logic
    serverTbody.innerHTML = "";
    serverId = 0;
    allServers = {};
  });
});
