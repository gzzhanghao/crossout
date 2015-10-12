var cache = { sin: [], cos: [] };

export default {

  init: function (velocity) {
    for (var angle = 0; angle < 360; angle += velocity) {
      cache.sin[angle] = Math.sin(angle / 180 * Math.PI);
      cache.cos[angle] = Math.cos(angle / 180 * Math.PI);
    }
  },

  calcSin: function (angle) {
    if (!cache.sin.hasOwnProperty(angle)) {
      cache.sin[angle] = Math.sin(angle / 180 * Math.PI);
    }
    return cache.sin[angle];
  },

  calcCos: function (angle) {
    if (!cache.cos.hasOwnProperty(angle)) {
      cache.cos[angle] = Math.cos(angle / 180 * Math.PI);
    }
    return cache.cos[angle];

  },

  sin: function (angle) {
    return cache.sin[angle];
  },

  cos: function (angle) {
    return cache.cos[angle];
  }
};
