import Phaser from 'phaser';
import { CONFIG, GAME_CONFIG } from './configs/game.js';
import { GameScene } from './scenes/GameScene.js';
import { MainMenu } from './scenes/MainMenu.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: GAME_CONFIG.BACKGROUND_COLOR,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [MainMenu, GameScene]
};

function setMode() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  if (width < 768 && height > width) {
    // Mobile portrait mode - full screen vertical layout
    config.width = width * 1.1;
    config.height = width * 1.95;
  } else {
    // Desktop/landscape mode
    config.width = CONFIG.TILE_WIDTH * 40;
    config.height = CONFIG.TILE_HEIGHT * 40;
  }
}

setMode();
window.addEventListener('resize', setMode);

new Phaser.Game(config);