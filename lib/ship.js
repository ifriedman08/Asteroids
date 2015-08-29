(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (optionsHash) {

    optionsHash.vel = [0, 0];
    optionsHash.radius = optionsHash.radius || 25;
    this.colliding = false;

    Asteroids.MovingObject.call(this, optionsHash);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ship = new Image();
    ship.src = './images/ship.gif';
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(ship, this.pos[0] - this.radius * 2, this.pos[1] - this.radius * 2);
    if (this.colliding) {
      ctx.beginPath();
      ctx.arc(this.pos[0] + 25, this.pos[1] - 10, 80, 0, 2 * Math.PI, false);
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#97159e';
      ctx.stroke();
    }
    this.colliding = false;
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
    optionsHash.pos = [this.pos[0] + 30, this.pos[1] - 48];
    optionsHash.vel = [10, 0];

    var bullet = new Asteroids.Bullet(optionsHash);
    game.bullets.push(bullet);
  };
})();
