const Emitter = require("./emitter");
const Human = require("./human");
const Gun = require("./gun");

const John = new Human({ name: "John", emitter: Emitter });
const Colt = new Gun({ emitter: Emitter });

John.play();
