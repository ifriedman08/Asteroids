(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(optionsHash) {
    this.pos = optionsHash.pos;
    this.vel = optionsHash.vel;
    this.radius = optionsHash.radius;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#f4a460';
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.stroke();
    ctx.fill();
  };


  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return Asteroids.Util.dist(this.pos, otherObject.pos) < (this.radius + otherObject.radius);
  };
})();
