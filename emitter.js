/**
 * @name Emitter
 *
 * @description
 * Syncs events between Gun and Human
 *
 * - sync human-gun interactions via events
 */
const EventEmitter = require("events");

class Emitter extends EventEmitter {
  constructor() {
    super();
    this.on('roll', () => {});
    this.on('trigger_hammer', () => {});
  }
  // on(eventName, handler) {
  //   console.log(eventName);
  // }
}

module.exports = new Emitter();
