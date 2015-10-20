import {on} from './utils/Events';
import Player from './models/Player';
import EnemyManager from './models/EnemyManager';
import Scene from './components/Scene';

require('./styles/main.less');

var player = new Player();
var enemyManager = new EnemyManager();
var scene = new Scene();

function onFrame () {

  player.onFrame();
  var stop = enemyManager.onFrame(player);

  scene.onFrame(player, enemyManager.enemies);

  if (!stop) {
    requestAnimationFrame(onFrame);
  }
}

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

scene.appendTo(document.body);
onFrame();
