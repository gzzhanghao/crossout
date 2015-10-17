import assign from 'object-assign';
import Component from './Component';
import template from './characters/template.html';

require('./characters/style.less');

var defaults = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default class Characters extends Component {

  constructor(options) {
    super(template);
    this.context = this.element.getContext('2d');
    assign(this, defaults, options);
    assign(this.element, defaults, options);
    assign(this, {
      halfWidth: this.width >> 1,
      halfHeight: this.height >> 1
    });
  }

  onFrame(position, players, enemies) {
    var halfSize = players.size >> 1;

    this.context.clearRect(0, 0, this.width, this.height);

    this.context.fillStyle = 'red';
    this.context.fillRect(
      this.halfWidth + players.x - halfSize - position[0],
      this.halfHeight + players.y - halfSize - position[1],
      players.size, players.size
    );

    this.context.fillStyle = 'blue';
    enemies.forEach(enemy =>
      this.context.fillRect(
        this.halfWidth + enemy.x - enemy.size / 2 - position[0],
        this.halfHeight + enemy.y - enemy.size / 2 - position[1],
        enemy.size, enemy.size
      )
    );
  }
}