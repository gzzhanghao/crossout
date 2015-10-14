var Events = {
  on: function (target, event, listener) {
    target.addEventListener(event, listener);
  }
};

export default Events;
