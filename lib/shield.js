(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Shield = Asteroids.Shield = function (optionsHash) {

    optionsHash.radius = optionsHash.radius || 20;

    Asteroids.MovingObject.call(this, optionsHash);
  };

  Asteroids.Util.inherits(Shield, Asteroids.MovingObject);

  Shield.prototype.draw = function (ctx) {
    var asteroid = new Image();
    asteroid.src = './images/shield.png';
    ctx.drawImage(asteroid, this.pos[0], this.pos[1], 40, 40);
  };


  Shield.prototype.collideWith = function (otherObject, game) {
    if (otherObject.__proto__ === Asteroids.Ship.prototype) {
      game.shields += 15;
      if (game.shields > 100) {
        game.shields = 100;
      }
      game.remove(this)
    }
  };
})();
