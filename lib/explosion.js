(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function (optionsHash) {
    optionsHash.radius = optionsHash.radius || 30;

    Asteroids.MovingObject.call(this, optionsHash);
    this.alpha = 1;
    this.count = 0;
  };

  Asteroids.Util.inherits(Explosion, Asteroids.MovingObject);

  Explosion.prototype.collideWith = function (otherObject, game) {

  };

  Explosion.prototype.draw = function (ctx, game) {
    var explosion = new Image();
    explosion.src = './images/explosion1.png';
    ctx.globalCompositeOperation="source-over";
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(explosion, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
    this.count += 1;
    this.alpha -= 0.05;
    if (this.count > 10 ) {
      game.remove(this);
    }
    ctx.globalAlpha = 1;
  };
})();
