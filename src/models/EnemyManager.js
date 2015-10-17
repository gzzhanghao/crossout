import Enemy from './Enemy';

export default class EnemyManager {

  constructor() {
    this.enemies = [];
    for (var i = 0; i < 15; i++) {
      var acceleration = 1 + 0.4 * Math.random();
      this.enemies.push(new Enemy({
        x: Math.cos(24 * i / 180 * Math.PI) * 50,
        y: Math.sin(24 * i / 180 * Math.PI) * 50,
        orientation: 24 * i,
        friction: Math.random() * 0.3 + 0.5,
        acceleration: acceleration,
        rotateSpeed: 1.5 / acceleration
      }));
    }
  }

  onFrame(target) {
    this.enemies.forEach(enemy => enemy.onFrame(target));
  }
}
