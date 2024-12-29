const board = document.querySelector(".board");
const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-button");
const players = ["X", "O"];

let currentPlayer = players[0];

message.textContent = `X's turn`;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

squares.forEach((square, i) => {
  square.addEventListener("click", () => {
    if (square.textContent !== "" || checkWinner(currentPlayer)) {
      return;
    }

    square.textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
      message.textContent = `Game Over. ${currentPlayer} wins the game!`;
      highlightWinningSquares(currentPlayer);
      return;
    }

    if (checkTieResult()) {
      message.textContent = "Game tied! Please restart.";
      return;
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    message.textContent = `${currentPlayer}'s turn`;
  });
});

function checkWinner(currentPlayer) {
  return winningPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    );
  });
}

function highlightWinningSquares(currentPlayer) {
  winningPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      [squares[a], squares[b], squares[c]].forEach(square => {
        square.style.backgroundColor = "#98fb98";
      });
    }
  });
}

function checkTieResult() {
  return Array.from(squares).every(square => square.textContent !== "");
}

function restartGame() {
  squares.forEach(square => {
    square.textContent = "";
    square.style.backgroundColor = "#e6e6fa";
  });

  message.textContent = `X's turn`;
  currentPlayer = players[0];
}

restartBtn.addEventListener("click", restartGame);
