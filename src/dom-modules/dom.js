import {
  createBoard,
  shadowTheBoard,
  changeGameStateMsg,
  clearBoard,
  placeShips,
  enableButtons,
  enableBoard,
  disableBoard,
} from "./ui-board.js";
import { player1, player2 } from "../game-modules/data-creation.js";
import { firstPlayerMove, startGame, placeAllShips } from "./game-functions.js";
import { setupDragAndDrop } from "./dnd.js";

const body = document.querySelector("body");
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
body.appendChild(gameContainer);
const boardsContainer = document.createElement("div");
boardsContainer.classList.add("boards-container");
body.appendChild(gameContainer);
const gameState = document.createElement("div");
gameState.classList.add("game-state");
gameState.textContent = "Place your ships";
const player1BoardContainer = document.createElement("div");
player1BoardContainer.classList.add("board-container");
const player2BoardContainer = document.createElement("div");
player2BoardContainer.classList.add("board-container");
const btnsContainer = document.createElement("div");
btnsContainer.classList.add("btns-container");
const randomizeBtn = document.createElement("button");
randomizeBtn.textContent = "Place randomly";
randomizeBtn.addEventListener("click", () => {
  clearBoard("first");
  player1.gameboard.placeShipsRandomly();
  placeShips(player1.gameboard.data, "first");
  setupDragAndDrop(player1);
});
randomizeBtn.classList.add("btn", "random");
const manualText = document.createElement("p");
manualText.classList.add("manual");
manualText.textContent = "Click to rotate, drag to place ship";
btnsContainer.append(randomizeBtn);
const gameBtn = document.createElement("button");
gameBtn.classList.add("btn", "game-control");
gameBtn.textContent = "Play";
gameBtn.addEventListener("click", () => {
  if (gameBtn.textContent === "Play") startGame(player1, player2);
  else {
    gameBtn.textContent = "Play";
    placeAllShips(player1, player2);
    enableButtons();
    enableBoard();
    setupDragAndDrop(player1);
  }
});
const board1Label = document.createElement("p");
board1Label.classList.add("board-label");
board1Label.textContent = "Your fleet";
const board2Label = document.createElement("p");
board2Label.classList.add("board-label");
board2Label.textContent = "Opponent's fleet";
createBoard(player1BoardContainer, true);
createBoard(player2BoardContainer, false);
player1BoardContainer.appendChild(board1Label);
player2BoardContainer.appendChild(board2Label);
player1BoardContainer.append(manualText, btnsContainer);
boardsContainer.append(player1BoardContainer, player2BoardContainer);
gameContainer.append(gameState, boardsContainer, gameBtn);

placeAllShips(player1, player2);

document.querySelectorAll(".board.second .cell").forEach((cell) => {
  cell.addEventListener("click", (event) => {
    changeGameStateMsg("Your turn...");
    shadowTheBoard("first");
    disableBoard("first");
    firstPlayerMove(player1, player2, event);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setupDragAndDrop(player1);
});
