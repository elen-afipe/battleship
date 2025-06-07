import {
  createBoard,
  shadowTheBoard,
  changeGameStateMsg,
  clearBoard,
  placeShips,
} from "./ui-board.js";
import { player1, player2 } from "../game-modules/data-creation.js";
import {
  playRound,
  firstPlayerMove,
  startGame,
  placeAllShips,
} from "./game-functions.js";

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
});
randomizeBtn.classList.add("btn", "random");
const manualBtn = document.createElement("button");
manualBtn.classList.add("btn", "manual");
manualBtn.textContent = "Place manually";
btnsContainer.append(randomizeBtn, manualBtn);
const gameBtn = document.createElement("button");
gameBtn.classList.add("btn", "game-control");
gameBtn.textContent = "Play";
gameBtn.addEventListener("click", () => startGame(player1, player2));
createBoard(player1BoardContainer, true);
createBoard(player2BoardContainer, false);
player1BoardContainer.appendChild(btnsContainer);
boardsContainer.append(player1BoardContainer, player2BoardContainer);
gameContainer.append(gameState, boardsContainer, gameBtn);

placeAllShips(player1, player2);

document.querySelectorAll(".board.second .cell").forEach((cell) => {
  cell.addEventListener("click", (event) => {
    changeGameStateMsg("Your turn");
    shadowTheBoard("first");
    firstPlayerMove(player1, player2, event);
  });
});

// playRound(player1, player2);
