import Phaser from 'phaser';
import { CONFIG, GAME_CONFIG } from './configs/game.js';
import { GameScene } from './scenes/GameScene.js';
import { MainMenu } from './scenes/MainMenu.js';

const config = {
  type: Phaser.AUTO,
  width: CONFIG.TILE_WIDTH * CONFIG.TILE_COUNT_X,
  height: CONFIG.TILE_HEIGHT * CONFIG.TILE_COUNT_Y,
  parent: 'game-container',
  backgroundColor: GAME_CONFIG.BACKGROUND_COLOR,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [MainMenu, GameScene]
};

new Phaser.Game(config);