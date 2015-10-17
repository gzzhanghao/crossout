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
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.halfWidth = this.windowWidth >> 1;
    this.halfHeight = this.windowHeight >> 1;
    this.element.width = 2 * this.windowWidth;
    this.element.height = 2 * this.windowHeight;
    this.scenePos = [0, 0];
    this.renderPos = [0, 0];
  }

  onFrame(pos, scale, deltaPos, player) {

    this.scenePos[0] += deltaPos[0];
    this.scenePos[1] += deltaPos[1];

    if (this.scenePos[0] < - this.halfWidth) {
      this.scenePos[0] += this.halfWidth;
      this.renderPos[0] -= this.halfWidth;
      return this.render(player);
    } else if (this.scenePos[0] > this.halfWidth) {
      this.scenePos[0] -= this.halfWidth;
      this.renderPos[0] += this.halfWidth;
      return this.render(player);
    }

    if (this.scenePos[1] < - this.halfHeight) {
      this.scenePos[1] += this.halfHeight;
      this.renderPos[1] -= this.halfHeight;
      return this.render(player);
    } else if (this.scenePos[1] > this.halfHeight) {
      this.scenePos[1] -= this.halfHeight;
      this.renderPos[1] += this.halfHeight;
      return this.render(player);
    }

    this.transform(`translate(${- this.halfWidth - this.scenePos[0]}px, ${- this.halfHeight - this.scenePos[1]}px)`);
    if (this.iter++ % (this.gap / scale | 0)) {
      return;
    }
    this.context.clearRect(pos[0] + this.halfWidth - this.renderPos[0] | 0, pos[1] + this.halfHeight - this.renderPos[1] | 0, 2, 2);
    this.context.fillRect(pos[0] + this.halfWidth - this.renderPos[0] | 0, pos[1] + this.halfHeight - this.renderPos[1] | 0, 2, 2);
  }

  render() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }
}
