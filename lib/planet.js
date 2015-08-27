(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Planet = Asteroids.Planet = function (optionsHash) {
    optionsHash.radius = optionsHash.radius || 75;
    optionsHash.color = optionsHash.color || "#228b22";

    Asteroids.MovingObject.call(this, optionsHash);
    this.idx = Math.floor(Math.random() * 10) + 1;
  };

  Asteroids.Util.inherits(Planet, Asteroids.MovingObject);

  Planet.prototype.collideWith = function (otherObject, game) {
  };

  Planet.prototype.draw = function (ctx) {
    var planet = new Image();
    ctx.globalCompositeOperation = 'destination-over';
    planet.src = './images/planet'+ this.idx + '.png';
    ctx.drawImage(planet, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
  };
})();
