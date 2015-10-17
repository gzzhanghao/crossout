import assign from 'object-assign';
import Component from './Component';
import template from './scene/template';
import Paths from './Paths';
import Characters from './Characters';

require('./scene/style.less');

var defaults = {
	width: window.innerWidth,
	height: window.innerHeight
};

export default class Scene extends Component {

	constructor(options) {
		super(template);

		assign(this, options, defaults);

		this.position = [0, 0];
		this.paths = new Paths;
		this.characters = new Characters;
		this.paths.appendTo(this.element);
		this.characters.appendTo(this.element);
	}

	onFrame(player, enemies) {
		this.position[0] += this.width * Math.pow(2 * (player.x - this.position[0]) / this.width, 3);
		this.position[1] += this.height * Math.pow(2 * (player.y - this.position[1]) / this.height, 3);
		this.characters.onFrame(this.position, player, enemies);
		this.paths.onFrame(this.position, player);
	}
}
