import Component from './Component';
import template from './enemy/template';

require('./enemy/style.less');

export default class Enemy extends Component {

	constructor(options) {
		super(template);

		options = options || {};

		this.x = options.x || 0;
		this.y = options.y || 0;
		this.style.width = this.style.height = (options.size || 8) + 'px';
		this.target = options.target || { x: 0, y: 0 };
		this.friction = options.friction || 0.3;
		this.velocityX = options.velocityX || 0;
		this.velocityY = options.velocityY || 0;
		this.orientation = options.orientation || 0;
		this.rotateSpeed = options.rotateSpeed || 3;
		this.acceleration = options.acceleration || 1;
	}

	rotate(angle) {
		this.orientation = (this.orientation + angle + 360) % 360;
	}

	onFrame() {
		this.x += this.velocityX;
		this.y += this.velocityY;

		var sin = Math.sin(this.orientation / 180 * Math.PI);
		var cos = Math.cos(this.orientation / 180 * Math.PI);

		this.velocityY = this.friction * this.velocityY + sin * this.acceleration;
		this.velocityX = this.friction * this.velocityX + cos * this.acceleration;

		var targetOrientation = Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI;
		var deltaOrientation = (this.orientation - targetOrientation + 360) % 360;
		if (deltaOrientation < this.rotateSpeed || 360 < this.rotateSpeed + deltaOrientation) {
			this.orientation = targetOrientation;
		} else if (deltaOrientation > 180) {
			this.rotate(this.rotateSpeed);
		} else {
			this.rotate(-this.rotateSpeed);
		}

		this.transform(`translate(${this.x}px, ${this.y}px) rotate(${this.orientation}deg)`)
	}
}
