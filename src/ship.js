const shipFactory = (size) => {
  const isHit = [];
  for (let i = 0; i < size; i += 1) {
    isHit.push(false);
  }

  const hit = (number) => {
    if (number >= 0 && number <= 3) isHit.splice(number, 1, true);
  };

  const isSunk = () => {
    let sunk = false;
    if (!isHit.includes(false)) sunk = true;
    return sunk;
  };
  return { isHit, hit, isSunk };
};

// eslint-disable-next-line import/prefer-default-export
export { shipFactory };
