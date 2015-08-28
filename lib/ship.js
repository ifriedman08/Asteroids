(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (optionsHash) {

    optionsHash.vel = [0, 0];
    optionsHash.radius = optionsHash.radius || 15;
    optionsHash.color = optionsHash.color || "#f00";

    Asteroids.MovingObject.call(this, optionsHash);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ship = new Image();
    ship.src = './images/ship.gif';
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(ship, this.pos[0] - this.radius * 2, this.pos[1] - this.radius * 2);
  };

  Ship.prototype.flashDamage = function (ctx) {
    ship = new Image();
    ship.src = './shipdamaged.png';
    ctx.drawImage(ship, this.pos[0], this.pos[1]);
  };

  Ship.prototype.move = function (DIM_X, DIM_Y) {
    this.vel[0] *= 0.99;
    this.vel[1] *= 0.99;
    if (this.pos[0] + this.vel[0] > 50 && this.pos[0] + this.vel[0] < DIM_X - 100) {
      this.pos[0] += this.vel[0];
    }
    if (this.pos[1] + this.vel[1] > 100 && this.pos[1] + this.vel[1] < DIM_Y - 100) {
      this.pos[1] += this.vel[1];
    }
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function (game) {
    var optionsHash = {};
    optionsHash.pos = [this.pos[0] + 45, this.pos[1] - 27];
    optionsHash.vel = [10, 0];

    var bullet = new Asteroids.Bullet(optionsHash);
    game.bullets.push(bullet);
  };
})();
