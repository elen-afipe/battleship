import { player1, player2 } from "../game-modules/data-creation.js";
import {
  markMissedCells,
  markHitCells,
  cellIsClickable,
  shadowTheBoard,
  unshadowTheBoard,
  changeGameStateMsg,
  clearBoard,
  placeShips,
  disableButtons,
  enableButtons,
} from "./ui-board.js";

let shipsPlaced = false;

function changeTurns(player1, player2) {
  if (player1.turn) {
    player1.turn = false;
    player2.turn = true;
    changeGameStateMsg("Computers' turn");
    shadowTheBoard("second");
    setTimeout(() => {
      computerMove(player1, player2);
    }, 1000);
  } else {
    changeGameStateMsg("Your turn");
    player1.turn = true;
    player2.turn = false;
  }
}

function allShipsSunk(player1, player2) {
  let p1Sunk = player1.gameboard.allShipsSunk();
  let p2Sunk = player2.gameboard.allShipsSunk();
  if (p1Sunk) {
    endGame("Computer won");
    return true;
  } else if (p2Sunk) {
    endGame("You won");
  } else return false;
}

export function firstPlayerMove(player1, player2, event) {
  const x = event.target.getAttribute("data-x");
  const y = event.target.getAttribute("data-y");
  const shipHit = player2.gameboard.receiveAttack([x, y]);
  if (shipHit) {
    markHitCells(x, y, "second");
    markMissedCells(player2.gameboard.data, "second");
    const allSunk = allShipsSunk(player1, player2);
    if (allSunk) return;
  } else {
    markMissedCells(player2.gameboard.data, "second");
    changeTurns(player1, player2);
    unshadowTheBoard("first");
  }
}

function computerMove(player1, player2) {
  const allSunk = allShipsSunk(player1, player2);
  if (allSunk) return;
  let moveChosen = false;
  let x;
  let y;
  while (!moveChosen) {
    [x, y] = player2.chooseMove();
    moveChosen = cellIsClickable(x, y);
  }

  const shipHit = player1.gameboard.receiveAttack([x, y]);
  if (shipHit) {
    markHitCells(x, y, "first");
    markMissedCells(player1.gameboard.data, "first");
    player2.addHitMoves(x, y);
    setTimeout(() => {
      computerMove(player1, player2);
    }, 1000);
  } else {
    markMissedCells(player1.gameboard.data, "first");
    changeTurns(player1, player2);
    unshadowTheBoard("second");
  }
}

export function playRound(player1, player2) {
  //   let p1Sunk = player1.gameboard.allShipsSunk();
  //   let p2Sunk = player2.gameboard.allShipsSunk();
  //   // while (!p1Sunk && !p2Sunk) {
  //   if (player1.turn) {
  //     p2Sunk = player2.gameboard.allShipsSunk();
  //   } else {
  //     // make move
  //     p1Sunk = player1.gameboard.allShipsSunk();
  //     // }
  //   }
}

function endGame(message) {
  changeGameStateMsg(message);
  const p1Board = document.querySelector(".board.first");
  p1Board.classList.add("shadow", "not-clickable");
  const p2Board = document.querySelector(".board.second");
  p2Board.classList.add("shadow", "not-clickable");

  const gameBtn = document.querySelector(".game-control");
  gameBtn.textContent = "New Round";
  gameBtn.classList.remove("hidden");
}

export function placeAllShips(player1, player2) {
  clearBoard("first");
  clearBoard("second");
  player2.hitMoves = [];
  shadowTheBoard("second");
  changeGameStateMsg("Place your ships");
  player1.gameboard.placeShipsRandomly();
  player2.gameboard.placeShipsRandomly();
  placeShips(player1.gameboard.data, "first");
  shipsPlaced = true;
}

export function startGame(player1, player2) {
  if (player1.turn) {
    changeGameStateMsg("Your turn");
    unshadowTheBoard("second");
  } else {
    changeGameStateMsg("Computer's turn");
    setTimeout(() => {
      computerMove(player1, player2);
    }, 1000);
  }
  disableButtons();
}
