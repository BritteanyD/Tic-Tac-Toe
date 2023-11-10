//Global scope
let board = [[, ,], [, ,], [, ,]];
let tiles = document.querySelectorAll(".tile");
let gameOver = false;
let players = [];
let currentPlayer;
let player1Turn = true;
let announcements = document.querySelector(".announcement");

//Gameboard object with board array
const boardGame = (() => {
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
                        announce(`${currentPlayer.name} wins!`);
                        return;
                    }
                }
                if (isTie()) {
                    gameOver = true;
                    announce("It's a tie!");
                    return;
                }

                //shows who's turn it is
                currentPlayer = player1Turn ? players[0] : players[1];
                //show who's turn it is in text
                function announce(text) {
                    announcements.textContent = text;
                }
                announce(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
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

//Logic that will control the start of the game
const gameControl = (() => {
    const startButton = document.querySelector("#start");

    startButton.addEventListener("click", () => {
        players = [
            createPlayers(document.querySelector("#player1").value, "X"),
            createPlayers(document.querySelector("#player2").value, "O")
        ]
        currentPlayer = player1Turn ? players[0] : players[1];
        //show who's turn it is in text
        function announce(text) {
            announcements.textContent = text;
        }
        announce(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
        //switch turns
        player1Turn = !player1Turn;
    })

    function resetBoard() {
        board = [[, ,], [, ,], [, ,]];
        // Remove symbols from tiles and reset their class 
        tiles.forEach((tile) => {
            tile.textContent = '';
            tile.classList.remove('x-symbol', 'o-symbol');
        });
        // Reset game state 
        gameOver = false;
        currentPlayer = players[0];
        player1Turn = true;
    }

    function resetPlayers() {
        document.getElementById("player1").value = "";
        document.getElementById("player2").value = "";
    }

    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => {
        resetBoard();
        resetPlayers();
    });
})();



/*To-Do List: 
1)change turn message to reflect announcements*/