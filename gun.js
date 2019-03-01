/**
 * @name Gun
 *
 * @description
 * listens to the 'roll' event
 * listens to the 'trigger_hammer' event
 * emits 'shoot' event with a Boolean parameter: true for real bullet, false for the fake one
 *
 * - has one bullet within 6 holes
 * - can shoot real / fake bullet
 */

class Gun {
  constructor({emitter}) {
    this.emitter = emitter;
    this.holes = 6;
    this.isFake = Math.round(Math.random()*100)>50;
    emitter.on('roll', this.onRoll.bind(this));
    emitter.on('shoot', this.shoot.bind(this));
  }

  onRoll() {
    console.log('GUN: cilynder is rolled');
    this.isFake = Math.round(Math.random()*100)>50;
    this.emitter.emit('shoot');
  }

  shoot() {
    this.holes = this.holes-1;
    console.log(`GUN: fired 1 bullet. There are ${this.holes} bullets`);

    if (this.holes >= 1) {
      if(this.isFake) {
        console.log('GUN: the bullet is REAL player shot himself :(');
      } else {
        console.log('GUN: the bullet is NOT REAL');
        this.emitter.emit('roll');
      }
    } else {
      console.log('GUN: there is no more bullets - GAME IS OVER!');
    }
  }
};

module.exports = Gun;
