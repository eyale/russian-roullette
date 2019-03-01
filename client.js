var net = require("net"),
  config = {
    host: "localhost",
    port: 1337
  },
  socket = new net.Socket();

socket.connect(config.port, config.host, function() {});

socket.on("close", function() {
  console.info("connection is closed");
});

socket.on("error", function(err) {
  console.error(err);
  return;
});
