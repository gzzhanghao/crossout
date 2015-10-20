import Enemy from './Enemy';

export default class EnemyManager {

  constructor() {
    this.enemies = [];
    for (var i = 0; i < 15; i++) {
      var acceleration = 1.4 + 0.6   * Math.random();
      this.enemies.push(new Enemy({
        x: Math.cos(24 * i / 180 * Math.PI) * 50,
        y: Math.sin(24 * i / 180 * Math.PI) * 50,
        orientation: 24 * i,
        friction: Math.random() * 0.3 + 0.5,
        acceleration: acceleration,
        rotateSpeed: 2.2 / acceleration
      }));
    }
  }

  onFrame(target) {
    var stop = false;
    this.enemies.forEach(enemy => stop |= enemy.onFrame(target));
    return stop;
  }
}
