//Gameboard object with board array
const boardGame = (() => {
    let board = [[, ,], [, ,], [, ,]];
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            //prevents anymore moves being made when winner
            if (gameOver) {
                return;
            }

            //update board array
            const row = Math.floor(index / 3);
            const col = index % 3;

            //Checks for taken tiles, adds symbol
            if (!board[row][col]) {
                board[row][col] = currentPlayer.symbol;
                tile.textContent = currentPlayer.symbol;
                tile.classList.add(currentPlayer.symbol === "X" ? "x-symbol" : "o-symbol");

                // Define the winning combinations using cell coordinates
                const winningCombo = [
                    // Rows
                    [[0, 0], [0, 1], [0, 2]],
                    [[1, 0], [1, 1], [1, 2]],
                    [[2, 0], [2, 1], [2, 2]],

                    // Columns
                    [[0, 0], [1, 0], [2, 0]],
                    [[0, 1], [1, 1], [2, 1]],
                    [[0, 2], [1, 2], [2, 2]],

                    // Diagonals
                    [[0, 0], [1, 1], [2, 2]],
                    [[0, 2], [1, 1], [2, 0]]
                ];

                // Check for a winner
                for (const combo of winningCombo) {
                    const [a, b, c] = combo;
                    const [x1, y1] = a;
                    const [x2, y2] = b;
                    const [x3, y3] = c;

                    if (
                        board[x1][y1] === currentPlayer.symbol &&
                        board[x2][y2] === currentPlayer.symbol &&
                        board[x3][y3] === currentPlayer.symbol
                    ) {
                        gameOver = true;
                        console.log(`${currentPlayer.name} wins!`);
                        return;
                    }
                }
                if (isTie()) {
                    gameOver = true;
                    console.log("It's a tie!");
                    return;
                }

                //shows who's turn it is
                currentPlayer = player1Turn ? players[0] : players[1];
                //show who's turn it is in text
                console.log(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
                //switch turns
                player1Turn = !player1Turn;
            }
        });
    });
     // Check for a tie
function isTie() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!board[row][col]) {
          return false; // There is an empty cell, so it's not a tie yet
        }
      }
    }
    return true; // All cells are filled, indicating a tie
  }
})();

//Player logic
const createPlayers = (name, symbol) => {
    return { name, symbol }
};

//Global scope
let gameOver = false;
let players = [];
let currentPlayer;
let player1Turn = true;


//Logic that will control the start of the game
const gameControl = (() => {

    const startButton = document.querySelector("#start");
    startButton.addEventListener("click", () => {
        players = [
            createPlayers(document.querySelector("#player1").value, "X"),
            createPlayers(document.querySelector("#player2").value, "O")
        ]
        currentPlayer = player1Turn ? players[0] : players[1];
        //show who's turn it is
        console.log(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
        //switch turns
        player1Turn = !player1Turn;
    })
})();

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
    alert("Hello");
});

/*To-Do List: 
1) tie...hide display until press start
2) change turn message to reflect announcements
3) get reset button working
4) do I need player turn at start??*/