import Phaser from 'phaser';
import { CONFIG, GAME_CONFIG } from '../configs/game.js';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    const { width, height } = this.scale;
    const centerX = width / 2;
    const centerY = height / 2;

    // Title
    this.add.text(centerX, centerY - 100, 'PHASER SNAKE', {
      font: '32px "Press Start 2P"',
      color: '#00ffba'
    }).setOrigin(0.5);

    // High Score
    const highScore = localStorage.getItem('snakeHighScore') || 0;
    this.add.text(centerX, centerY, `HIGH SCORE: ${highScore}`, {
      font: '16px "Press Start 2P"',
      color: '#7799ff'
    }).setOrigin(0.5);

    // Start Prompt
    const startText = this.add.text(centerX, centerY + 100, 'PRESS SPACE OR CLICK TO START', {
      font: '14px "Press Start 2P"',
      color: '#ff6b9d'
    }).setOrigin(0.5);

    // Simple blink effect
    this.tweens.add({
      targets: startText,
      alpha: 0,
      duration: 500,
      ease: 'Linear',
      yoyo: true,
      loop: -1
    });

    // Input handlers
    this.input.keyboard.on('keydown-SPACE', () => this.startGame());
    this.input.on('pointerdown', () => this.startGame());
  }

  startGame() {
    this.scene.start('GameScene');
  }
}