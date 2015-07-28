(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (optionsHash) {
    this.DIM_X = optionsHash.DIM_X;
    this.DIM_Y = optionsHash.DIM_Y;
    this.NUM_ASTEROIDS = optionsHash.NUM_ASTEROIDS;
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.stars = this.starArray()
    this.ship = new Asteroids.Ship({
      pos : this.randomPosition()
    });

    this.remainingLives = 3;

    key('w', function() {this.power([0,-1])}.bind(this.ship));
    key('d', function() {this.power([1,0])}.bind(this.ship));
    key('s', function() {this.power([0,1])}.bind(this.ship));
    key('a', function() {this.power([-1,0])}.bind(this.ship));
    key('p', function() {this.ship.fireBullet(this)}.bind(this));
  };

  Game.prototype.addAsteroids = function () {
    while (this.asteroids.length < this.NUM_ASTEROIDS) {
      var newAst = new Asteroids.Asteroid({
        pos : this.randomPosition(),
        vel : this.randomVelocity(),
        radius : Math.floor(Math.random() * 100) + 20
      });
      this.asteroids.push(newAst);
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * this.DIM_X );
    var y = Math.floor(Math.random() * this.DIM_Y );
    return [x, y];
  };

  Game.prototype.starArray = function () {
    var result = []
    for (var i = 0; i < 400; i++) {
      var x = Math.floor(Math.random() * this.DIM_X);
      var y = Math.floor(Math.random() * this.DIM_Y);
      result.push([x, y]);
    }
    return result;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = '#0ff'
    this.stars.forEach(function (starPos){
      ctx.fillRect(starPos[0], starPos[1], 4, 4);
    });
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    ctx.fillStyle = 'white';
    ctx.font = '48px courier';
    ctx.fillText('Remaining lives: ' + this.remainingLives, 50, 75);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
      if (this.isOutOfBounds(object.pos)) {
        if (object.isWrappable) {
          object.pos = this.wrap(object.pos);
        } else {
          this.remove(object);
        }
      }
    }.bind(this));
  };

  Game.prototype.randomVelocity = function () {
    var x = Math.floor(Math.random() * 5) - 3;
    var y = Math.floor(Math.random() * 5) - 3;
    if (x === 0 && y === 0) {
      x = -1;
    }
    return [x, y];
  };

  Game.prototype.checkCollisions = function (first_argument) {
    var allObs = this.allObjects()
    for (var i = 0; i < allObs.length - 1; i++) {
      for (var j = i + 1; j < allObs.length; j++) {
        if (allObs[i].isCollidedWith(allObs[j])) {
          allObs[i].collideWith(allObs[j], this);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    if (x < 0) {
      x = this.DIM_X + x;
    } else if (x > this.DIM_X) {
      x = x % this.DIM_X;
    }

    if (y < 0) {
      y = this.DIM_Y + y;
    } else if (y > this.DIM_Y) {
      y = y % this.DIM_Y;
    }

    return [x, y];
  };

  Game.prototype.remove = function (object) {
    if (object.__proto__ === Asteroids.Asteroid.prototype) {
      var index = this.asteroids.indexOf(object);
      this.asteroids.splice(index, 1);
    } else if (object.__proto__ === Asteroids.Bullet.prototype) {
      var index = this.bullets.indexOf(object);
      this.bullets.splice(index, 1);
    }
  };

  Game.prototype.allObjects = function () {
    return this.bullets.concat(this.asteroids).concat([this.ship]);
  };

  Game.prototype.isOutOfBounds = function (pos) {
    var x = pos[0];
    var y = pos[1];

    if (x < 0 || x > this.DIM_X || y < 0 || y > this.DIM_Y) {
      return true;
    } else {
      return false;
    }
  };
})();
