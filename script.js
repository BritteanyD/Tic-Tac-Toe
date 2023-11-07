//Gameboard object with board array
const boardGame = (() => {
    let board = [[, ,], [, ,], [, ,]]

    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => {
        tile.addEventListener("click", () => {

        })
    })
})();

//Player logic
const createPlayers = (name, john) => {
    return {
        name,
        john
    }
}

//Logic that will control the game flow
const gameControl = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const startButton = document.querySelector("#start");
    startButton.addEventListener("click", () => {
        const startGame = () => {
            players = [
                createPlayers(document.querySelector("#player1").value, "X"),
                createPlayers(document.querySelector("#player2").value, "O")
            ]
            currentPlayerIndex = 0;
            gameOver = false;
        }
        return {
            startGame
        }
    });
    
})();

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
    alert("Hello");
});