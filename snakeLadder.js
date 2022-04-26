const throwDice = function () {
  return Math.ceil(Math.random() * 6);
};

const createPlayer = function (playerName) {
  return {
    name: playerName,
    tile: 0
  };
};

const movePlayer = function (player, tile) {
  return { name: player.name, tile: tile };
};

const isGameOver = function (player, board) {
  return player.tile >= board.boardSize;
};

const snakeOn = function (tile, snakes) {
  return snakes[tile];
};

const ladderOn = function (tile, ladders) {
  return ladders[tile];
};

const nextTile = function (currentTile, board) {
  const snakeTail = snakeOn(currentTile, board.snakes);
  const ladderTop = ladderOn(currentTile, board.ladders);
  return snakeTail || ladderTop || currentTile;
};

const playMove = function (player, board) {
  const diceValue = throwDice();
  const newTile = player.tile + diceValue;
  return movePlayer(player, nextTile(newTile, board));
};

const startGame = function (game) {
  const board = game.board;
  const players = game.players;
  let moves = 0;

  while (true) {
    const currentPlayerIndex = moves % players.length;
    let currentPlayer = players[currentPlayerIndex];

    currentPlayer = playMove(currentPlayer, board);
    players[currentPlayerIndex] = currentPlayer;

    if (isGameOver(currentPlayer, board)) {
      return currentPlayer;
    }
    moves += 1;
  }
};

const initGame = function (gameStats) {
  const game = {
    board: {
      snakes: {
        '14': 4,
        '10': 2
      },
      ladders: {
        '3': 9,
        '8': 15
      },
      boardSize: 16
    }
  }
  const players = gameStats.players.map(createPlayer);
  game['players'] = players;
  return game;
};

const main = function () {
  const game = initGame({ players: ['john', 'hemant', 'kushal'] });
  console.log(startGame(game).name, 'won!');
  console.log(game);
};

main();