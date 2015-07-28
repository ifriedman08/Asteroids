(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (optionsHash) {

    optionsHash.radius = optionsHash.radius || 3;
    optionsHash.color = optionsHash.color || "#ff0";

    Asteroids.MovingObject.call(this, optionsHash);
    this.isWrappable = false;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject, game) {
    if (otherObject.__proto__ === Asteroids.Asteroid.prototype) {
      game.remove(otherObject);
      game.remove(this);
    }
  };
})();
