(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (optionsHash) {
    optionsHash.radius = optionsHash.radius || 75;

    Asteroids.MovingObject.call(this, optionsHash);
    this.idx = Math.floor(Math.random() * 4) + 1;
    this.hp = this.radius * 2;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject, game) {
    if (otherObject.__proto__ === Asteroids.Ship.prototype) {
      game.shields -= this.radius / 60;
    }
    if (game.shields < 0) {
      game.shields = 0;
    }
  };

  Asteroid.prototype.draw = function (ctx, game) {
    var asteroid = new Image();
    asteroid.src = './images/asteroid'+ this.idx +'.png';
    ctx.drawImage(asteroid, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
  };
})();
