export function createBoard(boardContainer, isFirst) {
  const table = document.createElement("table");
  table.classList.add("board");
  if (isFirst) {
    table.classList.add("first");
  } else {
    table.classList.add("second");
  }
  const row = document.createElement("tr");
  // create x labels
  for (let i = 0; i <= 10; i++) {
    const cell = document.createElement("td");
    cell.classList.add("x-label");
    cell.textContent = i === 0 ? " " : i;
    row.append(cell);
  }
  table.append(row);
  // create rows with y-labels
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  letters.forEach((letter) => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.classList.add("y-label");
    cell.textContent = letter;
    row.append(cell);
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      cell.dataset.y = letters.indexOf(letter);
      cell.dataset.x = i;
      row.append(cell);
    }
    table.append(row);
  });
  boardContainer.append(table);
}

export function findCell(x, y, boardSelector) {
  return document.querySelector(
    `.${boardSelector} [data-x="${x}"][data-y="${y}"]`,
  );
}

export function cellIsClickable(x, y, boardSelector = "first") {
  const cell = findCell(x, y, boardSelector);
  return !cell.classList.contains("not-clickable");
}

export function placeShips(gameboardData, boardSelector) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (gameboardData[x][y]) {
        const cellWithShip = findCell(x, y, boardSelector);
        cellWithShip.classList.add("ship");
      }
    }
  }
}

export function removeShip(x, y, ship, boardSelector = "first") {
  if (ship.isVertical) {
    for (let dy = 0; dy < ship.length; dy++) {
      const cell = findCell(x, y + dy, boardSelector);
      cell.classList.remove("ship");
      cell.removeAttribute("draggable", "true");
    }
  } else {
    for (let dx = 0; dx < ship.length; dx++) {
      const cell = findCell(x + dx, y, boardSelector);
      cell.classList.remove("ship");
      cell.removeAttribute("draggable", "true");
    }
  }
}

export function markMissedCells(gameboardData, boardSelector) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (gameboardData[x][y]) {
        const attackedCell = findCell(x, y, boardSelector);
        if (gameboardData[x][y] === "missed") {
          attackedCell.classList.add("missed");
          attackedCell.textContent = "•";
          attackedCell.classList.add("not-clickable");
        }
      }
    }
  }
}

export function markHitCells(x, y, boardSelector) {
  const attackedCell = findCell(x, y, boardSelector);
  attackedCell.classList.add("hit");
  attackedCell.textContent = "✖";
  attackedCell.classList.add("not-clickable");
}

export function shadowTheBoard(boardSelector) {
  const board = document.querySelector(`.board.${boardSelector}`);
  board.classList.add("shadow");
}

export function disableBoard(boardSelector = "first") {
  const board = document.querySelector(`.board.${boardSelector}`);
  board.classList.add("not-clickable");
}

export function enableBoard(boardSelector = "first") {
  const board = document.querySelector(`.board.${boardSelector}`);
  board.classList.remove("not-clickable");
}

export function unshadowTheBoard(boardSelector) {
  const board = document.querySelector(`.board.${boardSelector}`);
  board.classList.remove("shadow");
}

export function changeGameStateMsg(message) {
  const state = document.querySelector(".game-state");
  state.textContent = message;
}

export function clearBoard(boardSelector) {
  const board = document.querySelector(`.board.${boardSelector}`);
  board.classList.remove("shadow", "not-clickable");
  const cells = document.querySelectorAll(`.board.${boardSelector} .cell`);
  cells.forEach((cell) => {
    cell.classList.remove("shadow", "not-clickable", "ship", "hit", "missed");
    cell.textContent = "";
  });
}

export function disableButtons() {
  const gameBtn = document.querySelector(".game-control");
  const placeBtns = document.querySelector(".btns-container");
  gameBtn.classList.add("hidden");
  placeBtns.classList.add("hidden");
}

export function enableButtons() {
  const gameBtn = document.querySelector(".game-control");
  const placeBtns = document.querySelector(".btns-container");
  gameBtn.classList.remove("hidden");
  placeBtns.classList.remove("hidden");
}
