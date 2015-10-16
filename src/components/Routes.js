import Component from './Component';
import template from './routes/template';

require('./routes/style.less');

export default class Routes extends Component {

  constructor(gap) {
    super(template);
    this.gap = gap;
    this.iter = 0;
    this.context = this.element.getContext('2d');
    this.context.fillStyle = 'red';
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  onFrame(pos, scale) {
    if (this.iter++ % (this.gap / scale | 0)) {
      return;
    }
    this.context.clearRect(pos[0] | 0, pos[1] | 0, 2, 2);
    this.context.fillRect(pos[0] | 0, pos[1] | 0, 2, 2);
  }

  updatePos(x, y) {
    this.style.transform = `translate(${x}px, ${y}px)`;
  }
}
