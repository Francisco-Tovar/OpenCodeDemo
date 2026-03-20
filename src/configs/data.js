export const getInitialSnakeData = () => ({
  x: 5,
  y: 5,
  direction: 'right',
  nextDirection: 'right',
  tail: [],
  score: 0,
  highScore: parseInt(localStorage.getItem('snakeHighScore')) || 0
});