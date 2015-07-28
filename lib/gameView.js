(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.renderGameOver = function () {
    // this.ctx.clearRect(0, 0, this.game.DIM_X, this.game.DIM_Y);
    this.ctx.fillStyle = '#0ff'
    this.ctx.fillStyle = 'white';
    this.ctx.font = '180px courier';
    this.ctx.fillText('GAME OVER', 250, 475);
  };

  GameView.prototype.renderWinScreen = function () {
    // this.ctx.clearRect(0, 0, this.game.DIM_X, this.game.DIM_Y);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '180px courier';
    this.ctx.fillText('SUCCESS!', 250, 475);
  };

  GameView.prototype.start = function () {

    window.setInterval(function () {
      if (this.game.remainingLives < 0){
        this.renderGameOver();
      } else if (this.game.asteroids.length === 0) {
        this.renderWinScreen();
      } else {
        this.game.step();
        this.game.draw(this.ctx);
      }
    }.bind(this), 1000 / 60);
  };
})();
