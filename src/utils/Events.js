export default {
  on: function (target, event, listener) {
    target.addEventListener(event, listener);
  }
};
