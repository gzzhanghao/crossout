require('./styles/main.less');

import Player from './models/Player';
import Enemy from './models/Enemy';
import Scene from './components/Scene';
import Routes from './components/Routes';
import Events from './utils/Events';

var player = new Player({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  velocity: 10,
  radius: 20
});

var enemies = [];
for (var i = 0; i < 15; i++) {
  var acceleration = 1 + 0.4 * Math.random();
  enemies.push(new Enemy({
    x: player.x + Math.cos(24 * i / 180 * Math.PI) * 50,
    y: player.y + Math.sin(24 * i / 180 * Math.PI) * 50,
    orientation: 24 * i,
    friction: Math.random() * 0.3 + 0.5,
    acceleration: acceleration,
    rotateSpeed: 1.5 / acceleration
  }));
}

var routes = new Routes(3);
routes.appendTo(document.body);

var scene = new Scene();
scene.appendTo(document.body);

var scale = 1;
var scenePos = [0, 0];

function onFrame() {
  player.onFrame(scale);

  var pos = player.getRealPos();

  enemies.forEach(enemy => enemy.onFrame(pos, scale));
  routes.onFrame(pos, scale);
  scene.onFrame(player, enemies);

  scenePos[0] += window.innerWidth * Math.pow(2 * (pos[0] - scenePos[0]) / window.innerWidth - 1, 3);
  scenePos[1] += window.innerHeight * Math.pow(2 * (pos[1] - scenePos[1]) / window.innerHeight - 1, 3);

  scene.updatePos(-scenePos[0], -scenePos[1]);
  routes.updatePos(-scenePos[0], -scenePos[1]);

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

