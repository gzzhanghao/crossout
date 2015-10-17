import assign from 'object-assign'
import Trigonometric from '../utils/Trigonometric';

var defaults = {
  centerX: 0,
  centerY: 0,
  size: 10,
  radius: 30,
  velocity: 10,
  orientation: 0
};

export default class Player {

  constructor(options) {
    assign(this, defaults, options);
    this.paths = [{ orientation: 0, centerX: 0, centerY: 0, velocity: - this.velocity }];
  }

  rotate(angle) {
    this.orientation = (this.orientation + angle + 360) % 360;
  }

  turn() {
    this.velocity = -this.velocity;
    this.centerX += Trigonometric.cos(this.orientation) * this.radius * 2;
    this.centerY += Trigonometric.sin(this.orientation) * this.radius * 2;
    this.rotate(180);
    this.paths.push({
      centerX: this.centerX,
      centerY: this.centerY,
      velocity: this.velocity,
      orientation: this.orientation
    });
  }

  onFrame() {
    this.rotate(this.velocity);
    assign(this, {
      x: this.centerX + this.radius * Trigonometric.cos(this.orientation),
      y: this.centerY + this.radius * Trigonometric.sin(this.orientation)
    });
  }
}
