// Print GC events to stdout
const v8 = require("v8");
v8.setFlagsFromString("--trace_gc");

const server = require("net").createServer();
const stream = require("stream");
const cfg = {
  port: 1337,
  //       buffer_size: 1024*2, // buffer allocated per each socket client
  verbose: true // set to true to capture lots of debug info
};
const CLEANUP_INTERVAL = 60 * 1000;
const _log = function() {
  if (cfg.verbose) console.log.apply(console, arguments);
};

//const enigma = require('lib/enigma')

var Station = function() {
  let _stream = new stream.Transform({
    transform: function(chunk, enc, done) {
      this.push(chunk);
      done();
    },
    flush: function(done) {
      done();
    }
  });

  return _stream;
};

let stations = {
  "#global": Station()
};

server.on("connection", socket => {
  console.log(
    "%s:%s is connected\r\n",
    socket.remoteAddress,
    socket.remotePort
  );
  socket
    .pipe(
      stations["#global"],
      { end: false }
    )
    .pipe(
      socket,
      { end: false }
    );

  socket.on("close", has_err => {
    has_err && console.warn("socket will be closed due to an error");
  });

  socket.write("whats up\r\n");

  return;
});

server.on("error", err => {
  console.error(`error occured : ${err.message}\r\n${err.stack}`);
});

server.on("listening", () => {
  console.log(
    "NoobHub on %s:%d",
    server.address().address,
    server.address().port
  );
  setInterval(() => {
    return server.getConnections((err, count) => {
      if (err) throw err;
      return console.log("%d connections total", count);
    });
  }, CLEANUP_INTERVAL);
});

server.listen(cfg.port);
