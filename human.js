/**
 * @name Human
 *
 * @description
 * emits 'roll' event
 * emits 'trigger_hammer' event
 * listens to the 'shoot' event
 *
 * If the Human is alive he waits 30 seconds and shoots again till the end :)
 *
 * - can roll cylinder
 * - can pull the trigger
 */

class Human {
  constructor({ name, emitter }) {
    this.name = name;
    this.emitter = emitter;
  }

  roll() {
    this.emitter.emit('roll');
  };
  trigger_hammer() {
    this.emitter.emit('onTriggerHammer');
  };
  play() {
    console.log(`\n${this.name} has been started to play.`.toUpperCase());
    this.roll();
  };
}

module.exports = Human;
