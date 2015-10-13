var B = 4 / Math.PI;
var C = -4 / Math.pow( Math.PI, 2 );
var P = 0.225;

var Trigonometric = {

  sin: function (angle) {
    angle = (((angle + 180) % 360) - 180) / 180 * Math.PI;
    return B * angle + C * angle * Math.abs(angle);
  },

  cos: function (angle) {
    return Trigonometric.sin(((90 - angle) + 360) % 360);
  }
};

export default Trigonometric;
