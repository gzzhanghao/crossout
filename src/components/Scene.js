import Component from './Component';
import template from './scene/template';

require('./scene/style.less');

export default class Scene extends Component {

	constructor() {
		super(template);
		this.context = this.element.getContext('2d');
		this.scenePos = [0, 0];
		this.width = this.element.width = window.innerWidth / 2 * 3;
		this.height = this.element.height = window.innerHeight / 2 * 3;
	}

	onFrame(player, enemies, deltaPos) {
		this.context.clearRect(0, 0, this.width, this.height);

		var playerPos = player.getRealPos();

		this.scenePos[0] += deltaPos[0];
		this.scenePos[1] += deltaPos[1];

		this.context.fillStyle = 'red';
		this.context.fillRect(
			playerPos[0] - player.size / 2 - this.scenePos[0] | 0,
			playerPos[1] - player.size / 2 - this.scenePos[1] | 0,
			player.size, player.size
		);

		this.context.fillStyle = 'blue';
		enemies.forEach(enemy =>
			this.context.fillRect(
				enemy.x - enemy.size / 2 - this.scenePos[0] | 0,
				enemy.y - enemy.size / 2 - this.scenePos[1] | 0,
				enemy.size, enemy.size
			)
		);
	}
}
