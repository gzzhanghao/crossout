require('./styles/main.less');

import Player from './components/Player';
import Routes from './components/Routes';
import Enemy from './components/Enemy';
import Events from './utils/Events';

// @todo move these elements into component
var container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
document.body.appendChild(container);

var fpsCounter = document.createElement('div');
document.body.appendChild(fpsCounter);

container.style.position = 'absolute';
container.style.left = 0;
container.style.top = 0;
container.setAttribute('width', window.innerWidth.toString());
container.setAttribute('height', window.innerHeight.toString());

var player = new Player({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  velocity: 10,
  radius: 20
});
var routes = new Routes(3);
var enemies = [];

for (var i = 0; i < 15; i++) {
  var acceleration = 1 + 0.4 * Math.random();
  var enemy = new Enemy({
    x: player.x + Math.cos(24 * i / 180 * Math.PI) * 50,
    y: player.y + Math.sin(24 * i / 180 * Math.PI) * 50,
    orientation: 24 * i,
    friction: Math.random() * 0.3 + 0.5,
    acceleration: acceleration,
    rotateSpeed: 1.5 / acceleration
  });
  enemy.appendTo(container);
  enemies.push(enemy);
}

routes.appendTo(document.body);
player.appendTo(container);

var scale = 1;
var lastTime = Date.now();
var frame = 0;

function onFrame() {
  fpsCounter.innerText = ++frame / (Date.now() - lastTime) * 1000;
  player.onFrame(scale);
  var pos = player.getRealPos();
  routes.onFrame(pos, scale);
  enemies.forEach(enemy => enemy.onFrame(pos, scale));
  requestAnimationFrame(onFrame);
}

onFrame();

function activate (event) {
  event.preventDefault();
  if (player.velocity > 0) {
    player.turn();
  }
}

function deactivate (event) {
  event.preventDefault();
  if (player.velocity < 0) {
    player.turn();
  }
}

Events.on(window, 'touchstart', activate);
Events.on(window, 'keydown', activate);
Events.on(window, 'mousedown', activate);

Events.on(window, 'touchend', deactivate);
Events.on(window, 'keyup', deactivate);
Events.on(window, 'mouseup', deactivate);

