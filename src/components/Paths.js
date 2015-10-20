import assign from 'object-assign';
import Component from './Component';
import template from './paths/template';
import Trigonometric from '../utils/Trigonometric';

require('./paths/style.less');

var defaults = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default class Paths extends Component {

  constructor(options) {
    super(template);
    this.context = this.element.getContext('2d');
    options = options || {};
    options = {
      width: (options.width || defaults.width) << 1,
      height: (options.height || defaults.height) << 1
    };
    assign(this, options);
    assign(this.element, options);
    assign(this, {
      position: [0, 0],
      halfWidth: this.width >> 1,
      halfHeight: this.height >> 1,
      quarterWidth: this.width >> 2,
      quarterHeight: this.height >> 2
    });
  }

  onFrame(position, player) {
    var jump = false;
    if (position[0] - this.position[0] < - this.quarterWidth) {
      this.position[0] -= this.quarterWidth;
      jump = true;
    } else if (position[0] - this.position[0] > this.quarterWidth) {
      this.position[0] += this.quarterWidth;
      jump = true;
    }
    if (position[1] - this.position[1] < - this.quarterHeight) {
      this.position[1] -= this.quarterHeight;
      jump = true;
    } else if (position[1] - this.position[1] > this.quarterHeight) {
      this.position[1] += this.quarterHeight;
      jump = true;
    }
    this.transform(`translate(${this.position[0] - this.quarterWidth - position[0] | 0}px, ${this.position[1] - this.quarterHeight - position[1] | 0}px)`);
    if (jump) {
      return this.repaint(player);
    }
    this.context.clearRect(player.x + this.halfWidth - this.position[0] - 1 | 0, player.y + this.halfHeight - this.position[1] - 1 | 0, 2, 2);
    this.context.fillRect(player.x + this.halfWidth - this.position[0] - 1 | 0, player.y + this.halfHeight - this.position[1] - 1 | 0, 2, 2);
  }

  repaint(player) {
    this.context.clearRect(0, 0, this.width, this.height);
    var orientation = (player.orientation + 180) % 360;
    var velocity = player.velocity;
    for (var i = player.paths.length - 1; i >= 0; i--) {
      var path = player.paths[i];
      orientation = (orientation + 180) % 360;
      velocity = - velocity;
      var target = path.orientation % 360;
      if (this.halfWidth + path.centerX + player.radius < this.position[0] ||
        this.halfWidth + path.centerX - player.radius > this.position[0] + this.width ||
        this.halfHeight + path.centerY + player.radius < this.position[1] ||
        this.halfHeight + path.centerY - player.radius > this.position[1] + this.height) {
        orientation = target;
        continue;
      }
      for (; orientation !== target; orientation = (orientation + velocity + 360) % 360) {
        this.context.fillRect(
          this.halfWidth + path.centerX + player.radius * Trigonometric.cos(orientation) - this.position[0] - 1 | 0,
          this.halfHeight + path.centerY + player.radius * Trigonometric.sin(orientation) - this.position[1] - 1 | 0,
          2, 2
        );
      }
    }
  }
}
