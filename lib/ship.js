(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (optionsHash) {

    optionsHash.vel = [0, 0];
    optionsHash.radius = optionsHash.radius || 30;
    optionsHash.color = optionsHash.color || "#f00";

    Asteroids.MovingObject.call(this, optionsHash);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function (game) {
    this.pos = game.randomPosition();
    this.vel = [0, 0];
    game.remainingLives -= 1
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function (game) {
    var optionsHash = {};
    optionsHash.pos = this.pos.slice();
    optionsHash.vel = [this.vel[0] * 3, this.vel[1] * 3];

    var bullet = new Asteroids.Bullet(optionsHash);
    game.bullets.push(bullet);
  };
})();
