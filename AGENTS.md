<name>Phaser 3 Snake Game</name>
<version>0.1.0</version>
<description>Retro pixel art Snake game built with Phaser 3</description>
<repository>Type: Phaser 3 HTML5 game running in browser via CDN</repository>

## Build Commands

The game runs entirely in the browser via CDN, so there are no build commands. To test the game:

```bash
# View current implementation
cat index.html
```

To run the game in browser (development):

```bash
cd "D:\REPOSITORIO\OpenCodeDemo"
```

**Note**: Simply open `index.html` in a browser (no build process needed).

## Running Tests

The game has no tests. If you want to verify code correctness:

1. Run the game in browser
2. Play to verify functionality
3. Check browser console for errors

To test a specific scene in isolation:
1. Load `MainMenu.js` in browser
2. Load `GameScene.js` in browser  
3. Check Phaser debug output in console

## Code Style Guidelines

### Import Rules

- Use ES6 imports from 'phaser' and local files
- Import order: phaser first, then local modules
- Import paths use relative paths from src/ directory
- Always read files before overwriting them

```javascript
// Correct import order
import Phaser from 'phaser';
import { config } from './configs/game.js';
import { MainMenu } from './scenes/MainMenu.js';
```

### Naming Conventions

- Files: PascalCase for modules with single export (MainMenu.js), lowerCamelCase for others
- Classes: PascalCase (MainMenuScene, GameScene)
- Constants: UPPER_SNAKE_CASE (tileWidth, snakeSpeed)
- Variables: lowerCamelCase (x, direction, score)
- Exports: const by default

### Formatting Rules

- 2 spaces for indentation
- No trailing whitespace
- Semicolons after statements
- Import statements on their own lines
- Export statements after all code
- 80 characters maximum line width

### Type Requirements

- Phaser games auto-resolve types
- No explicit typing required for Phaser scene data
- Use const/let for state variables
- Use class for Scenes (extends Phaser.Scene)

### Error Handling

- Log Phaser errors via console
- No try/catch for async Phaser operations
- Handle user input with bounds checking
- Validate collision logic

## Cursor Rules

No Cursor rules found.

## Copilot Rules

```md
# Copilot Configuration

## Code Style
- 2-space indentation
- Import phaser first, then local modules
- Use PascalCase for classes, UPPER_SNAKE_CASE for constants
- No trailing whitespace

## Build Commands
None - runs in browser via CDN directly

## Running Tests
Open index.html in browser

## Project Structure
- index.html - Entry point
- src/main.js - Phaser game init
- src/configs/game.js - Game config
- src/configs/data.js - State configuration  
- src/scenes/MainMenu.js - Menu scene
- src/scenes/GameScene.js - Game scene
```

## Conventions

- All Phaser code must be valid JavaScript ES6+
- Scene methods are functions that take `this` and `scene` parameters
- Phaser scenes extend Phaser.Scene
- Use generatePixelArt() for retro pixel art
- Tile-based grid system: 20x20 tiles, 40x40 grid
- Arrow keys for movement control
- Speed in milliseconds between frames