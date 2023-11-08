//Gameboard object with board array
const boardGame = (() => {
    let board = [[, ,], [, ,], [, ,]]

    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            //update board array and visual side
            const row = Math.floor(index / 3);
            const col = index % 3;
            board[row][col] = currentPlayer.symbol;
            tile.textContent = currentPlayer.symbol;
            tile.classList.add(currentPlayer.symbol === "X" ? "x-symbol" : "o-symbol");

            currentPlayer = player1Turn ? players[0] : players[1];
            //show who's turn it is
            console.log(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
            //switch turns
            player1Turn = !player1Turn;
        })
    })
})();

//Player logic
const createPlayers = (name, symbol) => {
    return { name, symbol }
};

//Global scope
let players = [];
let currentPlayer;
let player1Turn = true;

//Logic that will control the game flow
const gameControl = (() => {
    let gameOver;

    const startButton = document.querySelector("#start");
    startButton.addEventListener("click", () => {
        players = [
            createPlayers(document.querySelector("#player1").value, "X"),
            createPlayers(document.querySelector("#player2").value, "O")
        ]
        gameOver = false;
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

// change turn message