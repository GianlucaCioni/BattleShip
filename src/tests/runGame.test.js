import { createPlayers, createGameBoards } from '../js/runGame';

test('createPlayers returns 2 player objects', () => {
  const { player1, player2 } = createPlayers(
    'human',
    'cpu',
    'Player 1',
    'Player 2',
  );
  expect(!!player1).toBe(true);
  expect(!!player2).toBe(true);
});

test('createPlayers returns human and cpu players correctly', () => {
  const { player1, player2 } = createPlayers(
    'human',
    'cpu',
    'Player 1',
    'Player 2',
  );

  expect(player1.type).toBe('human');
  expect(player2.type).toBe('cpu');
});

test('createGameBoards returns 2 gameBoard objects', () => {
  const { p1GameBoard, p2GameBoard } = createGameBoards(10);
  expect(!!p1GameBoard).toBe(true);
  expect(!!p2GameBoard).toBe(true);
});

test('createGameBoards returns 2 gameBoard objects with correct gridSize', () => {
  const { p1GameBoard, p2GameBoard } = createGameBoards(10);
  expect(!!p1GameBoard.grid[9]).toBe(true);
  expect(!!p2GameBoard.grid[10]).toBe(false);
});
