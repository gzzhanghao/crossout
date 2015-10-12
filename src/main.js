require('./styles/main.less');

import Player from './components/Player';
import Routes from './components/Routes';

var map = new Uint8Array(window.innerWidth * window.innerHeight);

var player = new Player();
var routes = new Routes(map, player);

routes.appendTo(document.body);
player.appendTo(document.body);

function onFrame() {
  player.onFrame();
  routes.onFrame();
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

