require('./styles/main.less');

import Player from './components/Player';
import Routes from './components/Routes';
import Enemy from './components/Enemy';

var map = new Uint8Array(window.innerWidth * window.innerHeight);

var player = new Player({
  velocity: 10
});
var enemies = [];
var routes = new Routes(map, player);

for (var i = 0; i < 30; i++) {
  enemies.push(new Enemy({
    target: player,
    x: window.innerWidth * Math.random(),
    y: window.innerHeight * Math.random(),
    velocityX: 50 * Math.random() - 5,
    velocityY: 50 * Math.random() - 5,
    friction: 0.7,
    acceleration: 1 + 3 * Math.random(),
    rotateSpeed: 2 + 30 * Math.random()
  }));
}

routes.appendTo(document.body);
player.appendTo(document.body);
enemies.forEach(enemy => enemy.appendTo(document.body));

function onFrame() {
  player.onFrame();
  routes.onFrame();
  enemies.forEach(enemy => enemy.onFrame());
  requestAnimationFrame(onFrame);
}

onFrame();

import {on} from './utils/Events';

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

on(window, 'touchstart', activate);
on(window, 'keydown', activate);
on(window, 'mousedown', activate);

on(window, 'touchend', deactivate);
on(window, 'keyup', deactivate);
on(window, 'mouseup', deactivate);

