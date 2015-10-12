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
    this.context.fillStyle = 'red';
  }

  onFrame() {
    this.active = !this.active;
    if (!this.active) {
      return;
    }
    var pos = this.player.getRealPos();

    var radius = 4;
    var dangerous = 30;
    this.context.clearRect(pos[0] - 1, pos[1] - 1, 3, 3);

    //this.context.fillStyle = 'rgba(0, 0, 0, .1)';

    //this.context.fillRect(pos[0] - dangerous, pos[1] - dangerous, 2 * dangerous, 2 * dangerous);
    //this.context.fillRect(pos[0] - radius, pos[1] - radius, 2 * radius, 2 * radius);
    this.context.fillRect(pos[0] - 0.5, pos[1] - 0.5, 1.5, 1.5);

    var posX = pos[0] | 0;
    var posY = pos[1] | 0;

    for (var x = posX - dangerous; x <= posX + dangerous; x++) {
      for (var y = posY - dangerous; y <= posY + dangerous; y++) {
        this.map[x + y * window.innerWidth] = Math.max(this.map[x + y * window.innerWidth], 1);
      }
    }

    for (x = posX - radius; x <= posX + radius; x++) {
      for (y = posY - dangerous; y <= posY + dangerous; y++) {
        this.map[x + y * window.innerWidth] = Math.max(this.map[x + y * window.innerWidth], 1);
      }
    }
  }
}
