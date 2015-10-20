import assign from 'object-assign';
import Trigonometric from '../utils/Trigonometric';

var defaults = {
	x: 0, y: 0,
	size: 8,
	friction: 0.7,
	velocityX: 0,
	velocityY: 0,
	orientation: 0,
	rotateSpeed: 1,
	acceleration: 1
};

export default class Enemy {

	constructor(options) {
		this.startTime = Date.now();
		assign(this, defaults, options);
	}

	rotate(angle) {
		this.orientation = (this.orientation + angle + 360) % 360;
	}

	onFrame(target) {

		this.x += this.velocityX;
		this.y += this.velocityY;

		//if (Math.abs(target.x - this.x) < 5 && Math.abs(target.y - this.y) < 5) {
		//	var time = (Date.now() - this.startTime) / 1000 | 0;
		//	requestAnimationFrame(function () {
		//		if (confirm(`你坚持了 ${time / 60 | 0}min ${time % 60}s，重试？`)) {
		//			location.href = location.href;
		//		}
		//	});
		//	return true;
		//}

		var sin = Trigonometric.sin(this.orientation);
		var cos = Trigonometric.cos(this.orientation);

		this.velocityY = this.friction * this.velocityY + sin * this.acceleration;
		this.velocityX = this.friction * this.velocityX + cos * this.acceleration;

		var targetOrientation = Math.atan2(target.y - this.y, target.x - this.x) * 180 / Math.PI | 0;
		var deltaOrientation = (this.orientation - targetOrientation + 360) % 360;
		if (deltaOrientation < this.rotateSpeed || 360 < this.rotateSpeed + deltaOrientation) {
			this.orientation = targetOrientation;
		} else if (deltaOrientation > 180) {
			this.rotate(this.rotateSpeed);
		} else {
			this.rotate(-this.rotateSpeed);
		}
	}
}
