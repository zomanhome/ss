function damagedOrSunk(board, attacks) {
  let result = { sunk: 0, damaged: 0, notTouched: 0, points: 0 };
  let ships = [];

  const numberOfShips = Math.max(...String(board).split(","));

  for (let i = 1; i <= numberOfShips; i++) {
    let re = new RegExp(i, "g");
    ships.push(String(board).match(re));
  }
  //console.log(ships);

  attacks.forEach(attack => {
    let x = attack[0] - 1;
    let y = board.length - attack[1];
    let digit = board[y][x];

    if (digit) {
      let ship = ships[board[y][x] - 1];
      for (let i = 0; i < ship.length; i++) {
        if (digit === Number(ship[i])) {
          ship[i] = 0;
          break;
        }
      }
    }
  });
  //console.log(ships);

  ships.forEach((ship, i) => {
    if (ship.every(deck => Number(deck) === 0)) {
      result.sunk++;
      result.points++;
    } else if (ship.every(deck => Number(deck) !== 0)) {
      result.notTouched++;
      result.points--;
    } else {
      result.damaged++;
      result.points += 0.5;
    }
  });

  return result;
}
let board = [
  [0, 0, 0, 2, 2, 0],
  [0, 3, 0, 0, 0, 0],
  [0, 3, 0, 1, 0, 0],
  [0, 3, 0, 1, 0, 0]
];
let attacks = [[2, 1], [1, 3], [4, 2], [2, 3], [4, 1]];
console.log(damagedOrSunk(board, attacks));
