const throwDice = function () {
  return Math.ceil(Math.random() * 6);
};

const movePlayer = function (player, tile) {
  return { name: player.name, tile: tile };
};

const isGameOn = function (player, board) {
  return player.tile < board.boardSize;
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
  if (snakeTail === undefined && ladderTop === undefined) {
    return currentTile;
  }
  return nextTile(snakeTail || ladderTop || currentTile, board);
};

const playMove = function (player, board) {
  const diceValue = throwDice();
  const newTile = player.tile + diceValue;
  return { newTile: nextTile(newTile, board) };
};

const getPlayer = function (players, moves) {
  const currentPlayerIndex = moves % players.length;
  return players[currentPlayerIndex];
};

const updatePlayer = function (player, move) {
  player.tile = move.newTile;
  return player;
};

const playGame = function (game) {
  const board = game.board;
  const players = game.players;

  let moves = 0;
  let currentPlayer;
  do {
    currentPlayer = getPlayer(players, moves);
    updatePlayer(currentPlayer, playMove(currentPlayer, board));
    moves += 1;
  } while (isGameOn(currentPlayer, board));
  return currentPlayer;
};

const createPlayer = function (playerName) {
  return {
    name: playerName,
    tile: 0
  };
};

const initGame = function (gameStats) {
  const game = {
    board: {
      snakes: {
        '14': 4,
        '10': 1
      },
      ladders: {
        '2': 10,
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
  console.log(playGame(game).name, 'won!');
  console.log(game);
};

main();