// Global scope
const emptyBoard = [
  [, ,],
  [, ,],
  [, ,]
];
let board = JSON.parse(JSON.stringify(emptyBoard));
let tiles = document.querySelectorAll('.tile');
let gameOver = false;
let players = [];
let currentPlayer;
let player1Turn = true;
let announcements = document.querySelector('.announcement');

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => {
  announcements.textContent = '';
  resetBoard();
  restartGame();
  enableGameBoard();
});

const disableGameBoard = () => {
  let box = document.querySelector('.container');
  box.classList.add('disabled');
};

const enableGameBoard = () => {
  let box = document.querySelector('.container');
  box.classList.remove('disabled');
};

const announce = text => {
  announcements.textContent = text;
};

const hasWinner = () => {
  const winningCombo = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2]
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2]
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2]
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1]
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2]
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2]
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0]
    ]
  ];

  for (const combo of winningCombo) {
    const [a, b, c] = combo;
    if (
      board[a[0]][a[1]] === currentPlayer.symbol &&
      board[b[0]][b[1]] === currentPlayer.symbol &&
      board[c[0]][c[1]] === currentPlayer.symbol
    ) {
      gameOver = true;
      announce(`${currentPlayer.name} wins!`);
      disableGameBoard();
      return true;
    }
  }
  return false;
};

const hasTie = () => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (!board[row][col]) {
        return false;
      }
    }
  }
  gameOver = true;
  announce("It's a tie!");
  disableGameBoard();
  return true;
};

const createPlayers = (name, symbol) => ({ name, symbol });

const restartGame = () => {
  players = [
    createPlayers(document.querySelector('#player1').value, 'X'),
    createPlayers(document.querySelector('#player2').value, 'O')
  ];
  currentPlayer = player1Turn ? players[0] : players[1];
  announce(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
  player1Turn = !player1Turn;
};

const resetBoard = () => {
  board = JSON.parse(JSON.stringify(emptyBoard));
  tiles.forEach(tile => {
    tile.textContent = '';
    tile.classList.remove('x-symbol', 'o-symbol');
  });
  gameOver = false;
  currentPlayer = players[0];
  player1Turn = true;
};

tiles.forEach((tile, index) => {
  tile.addEventListener('click', () => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (!board[row][col]) {
      board[row][col] = currentPlayer.symbol;
      tile.textContent = currentPlayer.symbol;
      tile.classList.add(
        currentPlayer.symbol === 'X' ? 'x-symbol' : 'o-symbol'
      );

      if (!hasWinner() && !hasTie()) {
        currentPlayer = player1Turn ? players[0] : players[1];
        announce(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
        player1Turn = !player1Turn;
      }
    }
  });
});

restartGame();
