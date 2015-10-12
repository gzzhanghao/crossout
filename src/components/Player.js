import Component from './Component';
import template from './player/template';
import Trigonometric from '../utils/Trigonometric';

require('./player/style.less');

export default class Player extends Component {

  constructor(options) {
    super(template);

    options = options || {};

    this.x = options.x || 100;
    this.y = options.y || 100;
    this.size = options.size || 10;
    this.radius = options.radius || 30;
    this.velocity = options.velocity || 6;
    this.orientation = options.orientation || 0;

    this.style.width = this.style.height = `${this.size}px`;
    this.style.transformOrigin = this.style.webkitTransformOrigin = `0 ${this.size / 2}px 0`;
    this.transform(`translate(${this.x + this.radius - this.size / 2}px, ${this.y - this.size / 2}px)`);

    Trigonometric.init(this.velocity);
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

  onFrame() {
    this.rotate(this.velocity);
    this.transform(`translate(${this.x}px, ${this.y}px) translateY(-${this.size / 2}px) rotate(${this.orientation}deg) translateX(${this.radius - this.size / 2}px)`);
  }
}
