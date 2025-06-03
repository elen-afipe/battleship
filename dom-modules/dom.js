import { createBoard, placeShips, markAttackedCells } from "./ui-board.js";
import { player1, player2 } from "../game-modules/data-creation.js";

const body = document.querySelector("body");
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
body.appendChild(gameContainer);
const gameState = document.createElement("div");
gameState.classList.add("game-state");
const player1BoardContainer = document.createElement("div");
player1BoardContainer.classList.add("board-container");
const player2BoardContainer = document.createElement("div");
player2BoardContainer.classList.add("board-container");

createBoard(player1BoardContainer, player1.gameboard, true);
createBoard(player2BoardContainer, player2.gameboard, false);
gameContainer.append(gameState, player1BoardContainer, player2BoardContainer);

function changeTurns(player1, player2) {
  if (player1.turn) {
    player1.turn = false;
    player2.turn = true;
  } else {
    player1.turn = true;
    player2.turn = false;
  }
}

placeShips(player1.gameboard.data, "first");

function playGame(player1, player2) {
  if (player1.turn) {
    document.querySelectorAll(".board.second .cell").forEach((cell) => {
      cell.addEventListener("click", function (event) {
        const x = this.getAttribute("data-x");
        const y = this.getAttribute("data-y");
        player2.gameboard.receiveAttack([x, y]);
        markAttackedCells(player2.gameboard.data, "second");
      });
    });
  } else {
    ///
  }
}
playGame(player1, player2);
