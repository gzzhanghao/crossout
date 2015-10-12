import Component from './Component';
import template from './routes/template';

require('./routes/style.less');

export default class Routes extends Component {

  constructor(map, player) {
    super(template);
    this.map = map;
    this.active = true;
    this.player = player;
    this.context = this.element.getContext('2d');
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  onFrame() {
    this.active = !this.active;
    if (!this.active) {
      return;
    }
    var pos = this.player.getRealPos();

    var radius = 6;

    this.context.clearRect(pos[0] - radius, pos[1] - radius, 2 * radius, 2 * radius);

    this.context.fillRect(pos[0] - radius, pos[1] - radius, 2 * radius, 2 * radius);
    this.context.fillRect(pos[0] - 0.5, pos[1] - 0.5, 1.5, 1.5);

    var posX = pos[0] | 0;
    var posY = pos[1] | 0;

    for (var x = posX - 5; x <= posX + 5; x++) {
      for (var y = posY - 5; y <= posY + 5; y++) {
        this.map[x + y * window.innerWidth] = 1;
      }
    }
  }
}