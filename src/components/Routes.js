import Component from './Component';
import template from './routes/template';

require('./routes/style.less');

export default class Routes extends Component {

  constructor(gap) {
    super(template);
    this.gap = gap;
    this.iter = 0;
    this.context = this.element.getContext('2d');
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
    this.context.fillStyle = 'red';
  }

  onFrame(pos, scale) {
    if (this.iter++ % (this.gap / scale | 0)) {
      return;
    }

    this.context.clearRect(pos[0] - 1, pos[1] - 1, 3, 3);
    this.context.fillRect(pos[0] - 0.5, pos[1] - 0.5, 1.5, 1.5);
  }
}
