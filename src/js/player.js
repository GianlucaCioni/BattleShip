const playerFactory = (name) => {
  const move = (yCoord, xCoord, gameBoard) => {
    gameBoard.receiveAttack(yCoord, xCoord);
  };
  return { move, name };
};

const cpuPlayerFactory = () => {
  const move = (gameBoard, gridSize) => {
    let yRandom = Math.floor(Math.random() * gridSize);
    let xRandom = Math.floor(Math.random() * gridSize);
    while (gameBoard.grid[yRandom][xRandom] !== '') {
      let emptyTilesCount = 0;
      gameBoard.grid.forEach((row) =>
        row.forEach((tile) => {
          if (tile === '') {
            emptyTilesCount += 1;
          }
        }),
      );
      if (emptyTilesCount !== 0) {
        yRandom = Math.floor(Math.random() * gridSize);
        xRandom = Math.floor(Math.random() * gridSize);
      } else {
        break;
      }
    }
    gameBoard.receiveAttack(yRandom, xRandom);
  };
  return { move };
};

export { playerFactory, cpuPlayerFactory };
