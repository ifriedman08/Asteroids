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
    var gameOverBox = $('<div>');
    gameOverBox.addClass('game-over');
    gameOverBox.text('Game Over: '+ this.game.points + ' points');
    gameOverBox.append($('<br><br>'));
    gameOverBox.append($("<a class='reload' href='javascript:history.go(0)'>Play Again!</a>"));
    $('.canvas-section').prepend(gameOverBox);
  };

  GameView.prototype.stop = function () {
    clearInterval(this.loop);
  };

  GameView.prototype.start = function () {
    this.loop = window.setInterval(function () {
      if (this.game.shields <= 0){
        this.game.step();
        this.game.draw(this.ctx);
        this.stop();
        this.renderGameOver();
      } else {
        this.game.step();
        this.game.draw(this.ctx);
      }
    }.bind(this), 1000 / 70);
  };
})();
