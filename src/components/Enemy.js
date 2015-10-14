import Component from './Component';
import Trigonometric from '../utils/Trigonometric';

require('./enemy/style.less');

export default class Enemy extends Component {

	constructor(options) {
		super(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));

		options = options || {};

		this.x = options.x || 0;
		this.y = options.y || 0;
		this.size = options.size || 8;
		this.friction = options.friction || 0.3;
		this.velocityX = options.velocityX || 0;
		this.velocityY = options.velocityY || 0;
		this.orientation = options.orientation || 0;
		this.rotateSpeed = options.rotateSpeed || 3;
		this.acceleration = options.acceleration || 1;

		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;

		this.attribute('class', 'enemy');
		this.attribute('width', this.size);
		this.attribute('height', this.size);
		this.attribute('transform', `translate(-${this.size} -${this.size})`);
	}

	rotate(angle) {
		this.orientation = (this.orientation + angle + 360) % 360;
	}

	onFrame(target, scale) {
		this.x += this.velocityX * scale;
		this.y += this.velocityY * scale;

		var sin = Trigonometric.sin(this.orientation);
		var cos = Trigonometric.cos(this.orientation);

		this.velocityY = this.friction * this.velocityY + sin * this.acceleration;
		this.velocityX = this.friction * this.velocityX + cos * this.acceleration;

		var targetOrientation = Math.atan2(target[1] - this.y, target[0] - this.x) * 180 / Math.PI | 0;
		var deltaOrientation = (this.orientation - targetOrientation + 360) % 360;
		if (deltaOrientation < this.rotateSpeed || 360 < this.rotateSpeed + deltaOrientation) {
			this.orientation = targetOrientation;
		} else if (deltaOrientation > 180) {
			this.rotate(this.rotateSpeed);
		} else {
			this.rotate(-this.rotateSpeed);
		}

		if (this.x > - this.size && this.x < this.windowWidth + this.size && this.y > - this.size && this.y < this.windowHeight + this.size) {
			this.attribute('transform', `translate(${this.x}, ${this.y}) rotate(${this.orientation} 0 0)`)
		}
	}
}
