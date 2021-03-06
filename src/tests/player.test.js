import { playerFactory, cpuPlayerFactory } from '../js/player';
import { gameBoardFactory } from '../js/gameBoard';

test('player.move() triggers gameBoard.receiveAttack()', () => {
  const gameBoard = gameBoardFactory(10);
  const player = playerFactory();
  player.move(0, 1, gameBoard);
  expect(gameBoard.grid[0][1]).toBe('missed');
});

test('cpuPlayer.move() makes a random move', () => {
  const gridSize = 2;
  const gameBoard = gameBoardFactory(gridSize);
  const cpuPlayer = cpuPlayerFactory();
  cpuPlayer.move(gameBoard, gridSize);
  let attackReceived = false;
  gameBoard.grid.forEach(
    (array) => (attackReceived += array.includes('missed')),
  );
  attackReceived = !!attackReceived;
  expect(attackReceived).toBe(true);
});

test('cpu never makes the same move twice', () => {
  const gridSize = 2;
  const gameBoard = gameBoardFactory(gridSize);
  const cpuPlayer = cpuPlayerFactory();
  cpuPlayer.move(gameBoard, gridSize);
  cpuPlayer.move(gameBoard, gridSize);
  cpuPlayer.move(gameBoard, gridSize);
  cpuPlayer.move(gameBoard, gridSize);
  expect(gameBoard.grid[0][0]).toBe('missed');
  expect(gameBoard.grid[0][1]).toBe('missed');
  expect(gameBoard.grid[1][0]).toBe('missed');
  expect(gameBoard.grid[1][1]).toBe('missed');
});

test("cpu move doesn't loop infinitely", () => {
  const gridSize = 1;
  const gameBoard = gameBoardFactory(gridSize);
  const cpuPlayer = cpuPlayerFactory();
  cpuPlayer.move(gameBoard, gridSize);
  cpuPlayer.move(gameBoard, gridSize);
  expect(gameBoard.grid[0][0]).toBe('missed');
});

test('cpu always makes a move if there is a tile available', () => {
  const gridSize = 5;
  const gameBoard = gameBoardFactory(gridSize);
  const cpuPlayer = cpuPlayerFactory();
  const player = playerFactory();
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (i !== gridSize - 1 || (j !== gridSize - 1 && j !== gridSize - 2)) {
        player.move(i, j, gameBoard);
      }
    }
  }

  gameBoard.placeShip(1, 'horizontal', gridSize - 1, gridSize - 1);
  cpuPlayer.move(gameBoard, gridSize);
  cpuPlayer.move(gameBoard, gridSize);

  expect(gameBoard.grid[gridSize - 1][gridSize - 1].status).toBe('hit');
  expect(gameBoard.grid[gridSize - 1][gridSize - 2]).toBe('missed');
});
