import Phaser from 'phaser';
import { CONFIG, GAME_CONFIG } from '../configs/game.js';
import { getInitialSnakeData } from '../configs/data.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const { 
      TILE_WIDTH, 
      TILE_HEIGHT, 
      TILE_COUNT_X, 
      TILE_COUNT_Y, 
      SNAKE_SPEED 
    } = CONFIG;
    const { SNAKE_COLOR, FOOD_COLORS } = GAME_CONFIG;

    // Reset game state
    this.snakeData = getInitialSnakeData();
    this.snakeData.x = 20; // Center
    this.snakeData.y = 15;
    this.snakeData.tail = [
      { x: 19, y: 15 },
      { x: 18, y: 15 }
    ];

    // Grid Visual Help (optional, but good for retro feel)
    this.graphics = this.add.graphics();
    
    // Fruit
    this.fruit = { x: 0, y: 0, color: 0x000000 };
    this.spawnFruit();

    // Score
    this.scoreText = this.add.text(10, 10, 'SCORE: 0', {
      font: '14px "Press Start 2P"',
      color: '#00ffba'
    });

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Game loop timer
    this.lastUpdateTime = 0;
    this.isDead = false;
  }

  update(time) {
    if (this.isDead) return;

    // Handle Input Buffer
    if (this.cursors.left.isDown && this.snakeData.direction !== 'right') {
      this.snakeData.nextDirection = 'left';
    } else if (this.cursors.right.isDown && this.snakeData.direction !== 'left') {
      this.snakeData.nextDirection = 'right';
    } else if (this.cursors.up.isDown && this.snakeData.direction !== 'down') {
      this.snakeData.nextDirection = 'up';
    } else if (this.cursors.down.isDown && this.snakeData.direction !== 'up') {
      this.snakeData.nextDirection = 'down';
    }

    // Interval Check
    if (time - this.lastUpdateTime > CONFIG.SNAKE_SPEED) {
      this.moveSnake();
      this.lastUpdateTime = time;
    }

    this.draw();
  }

  moveSnake() {
    this.snakeData.direction = this.snakeData.nextDirection;

    const head = { x: this.snakeData.x, y: this.snakeData.y };
    this.snakeData.tail.unshift(head);

    // Update Head Position
    switch (this.snakeData.direction) {
      case 'left': this.snakeData.x--; break;
      case 'right': this.snakeData.x++; break;
      case 'up': this.snakeData.y--; break;
      case 'down': this.snakeData.y++; break;
    }

    // Wall Collision
    if (this.snakeData.x < 0 || this.snakeData.x >= CONFIG.TILE_COUNT_X ||
        this.snakeData.y < 0 || this.snakeData.y >= CONFIG.TILE_COUNT_Y) {
      this.gameOver();
      return;
    }

    // Self Collision
    if (this.snakeData.tail.some(segment => 
        segment.x === this.snakeData.x && segment.y === this.snakeData.y)) {
      this.gameOver();
      return;
    }

    // Fruit Collision
    if (this.snakeData.x === this.fruit.x && this.snakeData.y === this.fruit.y) {
      this.eatFruit();
    } else {
      this.snakeData.tail.pop();
    }
  }

  eatFruit() {
    this.snakeData.score += 10;
    this.scoreText.setText(`SCORE: ${this.snakeData.score}`);
    this.spawnFruit();
  }

  spawnFruit() {
    const { TILE_COUNT_X, TILE_COUNT_Y } = CONFIG;
    const { FOOD_COLORS } = GAME_CONFIG;

    this.fruit.x = Math.floor(Math.random() * TILE_COUNT_X);
    this.fruit.y = Math.floor(Math.random() * TILE_COUNT_Y);
    this.fruit.color = Phaser.Utils.Array.GetRandom(FOOD_COLORS);

    // Ensure fruit doesn't spawn on snake
    if (this.snakeData.tail.some(s => s.x === this.fruit.x && s.y === this.fruit.y) || 
        (this.snakeData.x === this.fruit.x && this.snakeData.y === this.fruit.y)) {
      this.spawnFruit();
    }
  }

  draw() {
    const { TILE_WIDTH, TILE_HEIGHT } = CONFIG;
    const { SNAKE_COLOR } = GAME_CONFIG;
    
    this.graphics.clear();

    // Draw Fruit
    this.graphics.fillStyle(this.fruit.color, 1);
    this.graphics.fillRect(
      this.fruit.x * TILE_WIDTH, 
      this.fruit.y * TILE_HEIGHT, 
      TILE_WIDTH - 2, 
      TILE_HEIGHT - 2
    );

    // Draw Snake Head
    this.graphics.fillStyle(SNAKE_COLOR, 1);
    this.graphics.fillRect(
      this.snakeData.x * TILE_WIDTH, 
      this.snakeData.y * TILE_HEIGHT, 
      TILE_WIDTH - 2, 
      TILE_HEIGHT - 2
    );

    // Draw Snake Tail
    this.graphics.fillStyle(SNAKE_COLOR, 0.7);
    this.snakeData.tail.forEach(segment => {
      this.graphics.fillRect(
        segment.x * TILE_WIDTH, 
        segment.y * TILE_HEIGHT, 
        TILE_WIDTH - 2, 
        TILE_HEIGHT - 2
      );
    });
  }

  gameOver() {
    this.isDead = true;

    // High Score Save
    if (this.snakeData.score > this.snakeData.highScore) {
      localStorage.setItem('snakeHighScore', this.snakeData.score);
    }

    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, 'GAME OVER', {
      font: '32px "Press Start 2P"',
      color: '#ff6b9d'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 50, 'CLICK TO RESTART', {
      font: '14px "Press Start 2P"',
      color: '#7799ff'
    }).setOrigin(0.5);

    this.input.on('pointerdown', () => this.scene.start('MainMenu'));
  }
}