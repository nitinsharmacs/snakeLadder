const throwDice = function () {
  return Math.ceil(Math.random() * 6);
};

const changeTile = function (player, steps) {
  const newTile = player.tile + steps;
  return { name: player.name, tile: newTile };
};

const isGameEnded = function (player, board) {
  return player.tile >= board.boardSize;
};

const startGame = function () {
  const board = {
    snakes: [13, 15],
    ladders: [9, 3],
    boardSize: 16
  };
  let player = {
    name: 'john',
    tile: 0
  };
  while (!isGameEnded(player, board)) {
    const diceValue = throwDice();
    player = changeTile(player, diceValue);
    console.log(player);
  }
}

startGame();
