import Trigonometric from '../utils/Trigonometric';

export default class Player {

  constructor(options) {

    options = options || {};

    this.x = options.x || 100;
    this.y = options.y || 100;
    this.size = options.size || 10;
    this.radius = options.radius || 30;
    this.velocity = options.velocity || 6;
    this.orientation = options.orientation || 0;
  }

  rotate(angle) {
    this.orientation = (this.orientation + angle) % 360;
    if (this.orientation < 0) {
      this.orientation += 360;
    }
  }

  getRealPos() {
    return [
      this.x + this.radius * Trigonometric.cos(this.orientation),
      this.y + this.radius * Trigonometric.sin(this.orientation)
    ];
  }

  turn() {
    this.velocity = -this.velocity;
    this.x += Trigonometric.cos(this.orientation) * this.radius * 2;
    this.y += Trigonometric.sin(this.orientation) * this.radius * 2;
    this.rotate(180);
  }

  onFrame(scale) {
    this.rotate(this.velocity * scale);
  }
}
