(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (optionsHash) {
    optionsHash.radius = optionsHash.radius || 75;
    optionsHash.color = optionsHash.color || "#228b22";

    Asteroids.MovingObject.call(this, optionsHash);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject, game) {
    if (otherObject.__proto__ === Asteroids.Ship.prototype) {
      otherObject.relocate(game);
    }
  };
})();
