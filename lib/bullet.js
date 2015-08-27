(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (optionsHash) {

    optionsHash.radius = optionsHash.radius || 3;
    optionsHash.color = optionsHash.color || "#ff0";

    Asteroids.MovingObject.call(this, optionsHash);

  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    var asteroid = new Image();
    asteroid.src = './images/laser.png';
    ctx.drawImage(asteroid, this.pos[0], this.pos[1], this.radius * 20, this.radius * 5);
  };


  Bullet.prototype.collideWith = function (otherObject, game) {
    if (otherObject.__proto__ === Asteroids.Asteroid.prototype) {
      otherObject.hp -= 40;
      game.points += otherObject.radius;
      if (otherObject.hp <= 0) {
        game.remove(otherObject);
        game.points += 2 * otherObject.radius;
      }
      game.remove(this);
    }
  };
})();
