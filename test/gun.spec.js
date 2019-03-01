/**
 * ~constructor should
 *  assign an emitter
 *  subscribe to 'roll' evt
 *  subscribe to 'trigger_hammer' evt
 * #onRoll should
 *  update bullet number randomly
 * #onTriggerHammer should
 * emit 'shoot' event with isBullet value
 * #get isBullet should return Boolean, where true is if
 * shooted bullet is real, and false au contraire
 */
const sinon = require("sinon");
const should = require("should");
const Gun = require("../gun"),
  EvEmitter = require("events");

describe("Class: Gun", () => {
  describe("#constructor", () => {
    let gun, emitter, spyOn;
    beforeEach(() => {
      emitter = new EvEmitter();
      spyOn = sinon.spy(emitter, "on"); // emitter.on === SPY
      gun = new Gun(emitter); // there are 2 calls to emitter.on(...);
    });

    afterEach(() => emitter.on.restore());

    it("Should assign an Emitter", () => {
      gun._emitter.should.equal(emitter);
    });

    it("Should subscribe to `roll` event", () => {
      spyOn.getCall(0).args[0].should.equal("roll");
    });

    it("Should subscribe to `trigger_hammer`", () => {
      spyOn.getCall(1).args[0].should.equal("trigger_hammer");
    });
  });

  describe("#onRoll", () => {
    let gun, emitter, spyOn;
    //????
    // var emitter = new EventEmitter();
    beforeEach(() => {
      emitter = new EvEmitter();
      gun = new Gun(emitter); // there are 2 calls to emitter.on(...);
    });

    it("Should randomly select active bullet", () => {
      const bullets = [];
      gun.onRoll();
      bullets.push(gun._activeBullet);
      gun.onRoll();
      bullets.push(gun._activeBullet);
      gun.onRoll();
      bullets.push(gun._activeBullet);
      bullets.forEach(function(bullet) {
        bullet.should.be.within(0, 6);
      });
    });
  });
});
