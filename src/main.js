require('./styles/main.less');

import Player from './components/Player';
import Routes from './components/Routes';
import Enemy from './components/Enemy';

var map = new Uint8Array(window.innerWidth * window.innerHeight);

var player = new Player({
  velocity: 10,
  radius: 20
});
var routes = new Routes(3);
var enemies = [];

for (var i = 0; i < 10; i++) {
  var acceleration = 0.6 + 0.4 * Math.random();
  enemies.push(new Enemy({
    x: window.innerWidth * Math.random(),
    y: window.innerHeight * Math.random(),
    friction: Math.random() * 0.3 + 0.5,
    acceleration: acceleration,
    rotateSpeed: 0.8 / acceleration
  }));
}

routes.appendTo(document.body);
player.appendTo(document.body);
enemies.forEach(enemy => enemy.appendTo(document.body));

var scale = 1;

function onFrame() {
  player.onFrame(scale);
  var pos = player.getRealPos();
  routes.onFrame(pos, scale);
  enemies.forEach(enemy => enemy.onFrame(pos, scale));
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

