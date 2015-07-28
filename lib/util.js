(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  window.Asteroids.Util = {};

  Asteroids.Util.inherits = function (ChildClass, SuperClass) {
    var Surrogate = function () {};
    Surrogate.prototype = SuperClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Asteroids.Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      ((pos1[0] - pos2[0]) * (pos1[0] - pos2[0])) +
      ((pos1[1] - pos2[1]) * (pos1[1] - pos2[1]))
    );
  };
})();
