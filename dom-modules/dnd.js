import { findCell, removeShip, placeShips } from "./ui-board.js";
import { Ship } from "../game-modules/ship.js";
import { player1 } from "../game-modules/data-creation.js";

let dragState = null;
export function setupDragAndDrop(player1) {
  document.querySelectorAll(".board.first .cell").forEach((cell) => {
    const newCell = cell.cloneNode(true);
    cell.parentNode.replaceChild(newCell, cell);
  });

  document.querySelectorAll(".board.first .ship").forEach((cell) => {
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const shipData = player1.gameboard.data[x][y];

    if (shipData) {
      cell.setAttribute("draggable", "true");
      cell.addEventListener("dragstart", (e) => {
        e.stopPropagation();
        dragstartHandler(e, player1.gameboard);
      });
    }
  });

  document.querySelectorAll(".board.first .cell").forEach((cell) => {
    cell.addEventListener("dragover", (e) => {
      e.stopPropagation();
      dragoverHandler(e, player1.gameboard);
    });

    cell.addEventListener("drop", (e) => {
      e.stopPropagation();
      dropHandler(e, player1);
    });
  });

  document.querySelectorAll(".board.first .cell.ship").forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.stopPropagation();
      placeShipVertically(e, player1.gameboard, player1);
    });
  });

  document.removeEventListener("dragend", () => handleDragEnd(player1));
  document.addEventListener("dragend", () => handleDragEnd(player1));
}

function placeShipVertically(e, gameboard, player1) {
  const cell = e.target;
  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);
  const oldShip = gameboard.data[x][y];
  if (!oldShip || oldShip.length === 1) return;
  const firstCell = gameboard.findFirstCell(x, y, oldShip);
  const [targetX, targetY] = firstCell;
  gameboard.removeShipFromBoard(targetX, targetY, oldShip);
  removeShip(targetX, targetY, oldShip);
  console.log("placing");
  console.log(targetX, targetY);
  const newShip = new Ship(oldShip.length, !oldShip.isVertical);
  const shipPlaced = gameboard.placeShip([targetX, targetY], newShip);
  if (!shipPlaced) {
    gameboard.placeShip([targetX, targetY], oldShip);
  }
  placeShips(gameboard.data, "first");
  setupDragAndDrop(player1);
}

function drawShipForDrag(shipData) {
  const dragImage = document.createElement("div");
  dragImage.classList.add("drag-ghost");
  if (shipData.isVertical) {
    const width = 30;
    const height = 30 * shipData.length;
    dragImage.style.width = `${width}px`;
    dragImage.style.height = `${height}px`;
  } else {
    const width = 30 * shipData.length;
    const height = 30;
    dragImage.style.width = `${width}px`;
    dragImage.style.height = `${height}px`;
  }
  dragImage.style.backgroundColor = "navy";
  dragImage.style.position = "absolute";
  dragImage.style.top = "-10000px";
  document.body.appendChild(dragImage);
  return dragImage;
}

function dragstartHandler(e, gameboard) {
  console.log("Drag started", e.target);

  if (!e.target.classList.contains("ship")) {
    e.preventDefault();
    return;
  }

  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);
  const shipData = gameboard.data[x][y];

  if (!shipData) {
    e.preventDefault();
    return;
  }

  console.log(x, y);
  console.log(shipData);

  const firstCell = gameboard.findFirstCell(x, y, shipData);
  dragState = {
    ship: shipData,
    sourceX: firstCell[0],
    sourceY: firstCell[1],
    dropped: false,
  };
  e.dataTransfer.setData(
    "application/json",
    JSON.stringify({
      ship: shipData,
      x: firstCell[0],
      y: firstCell[1],
    }),
  );

  removeShip(firstCell[0], firstCell[1], shipData);
  gameboard.removeShipFromBoard(firstCell[0], firstCell[1], shipData);

  e.dataTransfer.effectAllowed = "move";

  const dragImage = drawShipForDrag(shipData);
  e.dataTransfer.setDragImage(dragImage, 15, 15);
}
// function colorDragImg(e, gameboard) {
//   const data = JSON.parse(e.dataTransfer.getData("application/json"));
//   const ship = new Ship(data.ship.length, data.ship.isVertical);
//   const dragImage = document.body.querySelector(".drag-ghost");
//   const targetX = parseInt(e.target.dataset.x);
//   const targetY = parseInt(e.target.dataset.y);
//   const shipPlaced = gameboard.placeShip([targetX, targetY], ship);
//   dragImage.classList.add("drag-over");
//   if (shipPlaced) {
//     dragImage.style.backgroundColor = "green";
//     gameboard.removeShipFromBoard(targetX, targetY, ship);
//   } else {
//     dragImage.style.backgroundColor = "red";
//   }
// }
function dragoverHandler(e, gameboard) {
  e.preventDefault();
  // colorDragImg(e, gameboard);
}

function dropHandler(e, player1) {
  const gameboard = player1.gameboard;
  e.preventDefault();

  console.log("Drop event", e.target);

  document.querySelectorAll(".drag-over").forEach((el) => {
    el.classList.remove("drag-over");
  });

  try {
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    const sourceX = parseInt(data.x);
    const sourceY = parseInt(data.y);
    const ship = new Ship(data.ship.length, data.ship.isVertical);

    const targetX = parseInt(e.target.dataset.x);
    const targetY = parseInt(e.target.dataset.y);

    console.log(
      `Moving ship from (${sourceX},${sourceY}) to (${targetX},${targetY})`,
    );

    const shipPlaced = gameboard.placeShip([targetX, targetY], ship);
    console.log(ship);
    console.log(shipPlaced);

    if (!shipPlaced) {
      gameboard.placeShip([sourceX, sourceY], ship);
    } else {
      if (dragState) {
        dragState.dropped = true;
      }
    }

    placeShips(gameboard.data, "first");
    document.querySelectorAll(".drag-over").forEach((el) => {
      el.classList.remove("drag-over");
    });
    document.body.querySelectorAll(".drag-ghost").forEach((el) => {
      el.remove();
    });
    setupDragAndDrop(player1);
  } catch (error) {
    console.error("Error during drop handling:", error);
  }
}

function handleDragEnd(player1) {
  document.querySelectorAll(".drag-over").forEach((el) => {
    el.classList.remove("drag-over");
  });
  document.body.querySelectorAll(".drag-ghost").forEach((el) => {
    el.remove();
  });
  if (dragState && !dragState.dropped) {
    console.log("Drop failed, restoring ship to original position");
    console.log(dragState);
    const sourceX = dragState.sourceX;
    const sourceY = dragState.sourceY;
    const ship = new Ship(dragState.ship.length, dragState.ship.isVertical);
    player1.gameboard.placeShip([sourceX, sourceY], ship);
    placeShips(player1.gameboard.data, "first");
    setupDragAndDrop(player1);
  }
  dragState = null;
}

// Add CSS to your stylesheet:
/*
  .dragging {
    opacity: 0.4;
  }
  .drag-over {
    background-color: rgba(0, 255, 0, 0.2);
  }
  */
