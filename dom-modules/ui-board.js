export function createBoard(boardContainer, gameboard, isFirst) {
  const table = document.createElement("table");
  table.classList.add("board");
  if (isFirst) table.classList.add("first");
  else table.classList.add("second");
  const row = document.createElement("tr");
  // create y labels
  for (let i = 0; i <= 10; i++) {
    const cell = document.createElement("td");
    cell.classList.add("x-label");
    cell.textContent = i === 0 ? " " : i;
    row.append(cell);
  }
  table.append(row);
  // create rows with x-labels
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  letters.forEach((letter)=>{
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
  })
  boardContainer.append(table);
}

export function placeShips(gameboardData, turn) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (gameboardData[x][y]) {
        const cellWithShip = document.querySelector(
          `.${turn} [data-x="${x}"][data-y="${y}"]`,
        );
        cellWithShip.classList.add("ship");
      }
    }
  }
}
export function findCell(x, y, turn) {
  return 
}
export function markAttackedCells(gameboardData, turn) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (gameboardData[x][y]) {
        const attackedCell = document.querySelector(
          `.${turn} [data-x="${x}"][data-y="${y}"]`,
        );
        if (gameboardData[x][y] === "missed") {
          attackedCell.classList.add("missed");
          attackedCell.textContent = "•";
        } else {
          attackedCell.textContent = "✖";
        }
      }
    }
  }
}

