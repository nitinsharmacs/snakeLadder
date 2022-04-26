const rollDice = function () {
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
  const diceValue = rollDice();
  const newTile = player.tile + diceValue;
  let finalTile = nextTile(newTile, board);
  if (newTile > board.boardSize) {
    finalTile = player.tile;
  }
  return { diceValue: diceValue, newTile: finalTile };
};

const getPlayer = function (players, moves) {
  const currentPlayerIndex = moves % players.length;
  return players[currentPlayerIndex];
};

const updatePlayer = function (player, move) {
  player.tile = move.newTile;
  return player;
};

const copyObj = function (object) {
  const newObject = {};
  for (const key in object) {
    newObject[key] = object[key];
  }
  return newObject;
};

const playGame = function (game) {
  const board = game.board;
  const players = game.players;
  const gameStats = [];
  let moves = 0;
  let currentPlayer;
  do {
    currentPlayer = getPlayer(players, moves);
    const move = playMove(currentPlayer, board)
    gameStats.push({ player: copyObj(currentPlayer), stats: move });
    updatePlayer(currentPlayer, move);
    moves += 1;
  } while (isGameOn(currentPlayer, board));
  return {
    winner: currentPlayer,
    gameStats: gameStats
  };
};

const createPlayer = function (playerName) {
  return {
    name: playerName,
    tile: 0
  };
};

const initGame = function (playerNames) {
  const game = {
    board: {
      snakes: {
        '14': 4,
        '10': 1,
        '55': 19,
        '99': 54,
        '76': 29,
      },
      ladders: {
        '2': 10,
        '8': 15,
        '20': 44,
        '49': 95,
        '81': 90
      },
      boardSize: 16
    }
  }
  const players = playerNames.map(createPlayer);
  game['players'] = players;
  return game;
};

const main = function () {
  const game = initGame(['john', 'hemant']);
  const gameResult = playGame(game);
  console.log(gameResult.gameStats, '\n', gameResult.winner);
};

main();