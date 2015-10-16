import Component from './Component';
import template from './scene/template';

require('./scene/style.less');

export default class Scene extends Component {

	constructor() {
		super(template);
		this.context = this.element.getContext('2d');
		this.width = this.element.width = window.innerWidth;
		this.height = this.element.height = window.innerHeight;
	}

	onFrame(player, enemies) {
		this.context.clearRect(0, 0, this.width, this.height);

		var playerPos = player.getRealPos();
		this.context.fillRect(playerPos[0] - player.size / 2, playerPos[1] - player.size / 2, player.size, player.size);

		enemies.forEach(enemy => {
			if (enemy.x > -enemy.size && enemy.x < this.width + enemy.size && enemy.y > -enemy.size && enemy.y < this.height + enemy.size) {
				this.context.fillRect(enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size)
			}
		});
	}

	updatePos(x, y) {
		this.style.transform = `translate(${x}px, ${y}px)`;
	}
}
