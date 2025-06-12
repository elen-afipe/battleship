import { Ship } from "./ship.js";
export class Gameboard {
  constructor() {
    this.data = this.#createEmptyBoard();
  }

  #createEmptyBoard() {
    const board = Array.from({ length: 10 }, () => new Array(10).fill(null));
    return board;
  }

  #placeSuits(xCoord, yCoord, ship) {
    for (let i = 0; i < ship.length; i++) {
      const x = ship.isVertical ? xCoord : xCoord + i;
      const y = ship.isVertical ? yCoord + i : yCoord;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.data[nx][ny]) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  #coordsSuit(coordX, coordY, ship) {
    if (ship.isVertical === true && coordY + ship.length > 10) {
      return false;
    } else if (ship.isVertical === false && coordX + ship.length > 10) {
      return false;
    } else return true;
  }

  #addShipToBoard(x, y, ship) {
    if (ship.isVertical) {
      for (let dy = 0; dy < ship.length; dy++) {
        this.data[x][y + dy] = ship;
      }
    } else {
      for (let dx = 0; dx < ship.length; dx++) {
        this.data[x + dx][y] = ship;
      }
    }
  }

  removeShipFromBoard(x, y, ship) {
    if (ship.isVertical) {
      for (let dy = 0; dy < ship.length; dy++) {
        this.data[x][y + dy] = null;
      }
    } else {
      for (let dx = 0; dx < ship.length; dx++) {
        this.data[x + dx][y] = null;
      }
    }
  }

  findFirstCell(x, y, ship) {
    if (ship.isVertical) {
      while (y >= 0 && this.data[y] && this.data[x][y] === ship) {
        --y;
      }
      ++y;
      return [x, y];
    } else {
      while (x >= 0 && this.data[x] && this.data[x][y] === ship) {
        --x;
      }
      ++x;
      return [x, y];
    }
  }

  #trackSunkShipHits(x, y, ship) {
    const firstCell = this.findFirstCell(x, y, ship);
    for (let i = 0; i < ship.length; i++) {
      const x = ship.isVertical ? firstCell[0] : firstCell[0] + i;
      const y = ship.isVertical ? firstCell[1] + i : firstCell[1];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.data[nx][ny] === null) this.data[nx][ny] = "missed";
          }
        }
      }
    }
  }

  #trackHitsAroundShip(x, y, ship) {
    if (ship.sunk) {
      if (ship.isVertical) this.#trackSunkShipHits(x, y, ship);
      else this.#trackSunkShipHits(x, y, ship);
    } else {
      // mark 4 diagonal cells
      const cellsToMark = [
        [x - 1, y - 1],
        [x + 1, y + 1],
        [x - 1, y + 1],
        [x + 1, y - 1],
      ];
      cellsToMark.forEach((cell) => {
        if (cell[0] >= 0 && cell[0] < 10 && cell[1] >= 0 && cell[1] < 10) {
          if (this.data[cell[0]][cell[1]] === null) {
            this.data[cell[0]][cell[1]] = "missed";
          }
        }
      });
    }
  }

  allShipsSunk() {
    const allShipsLength = 20;
    let currentSunkLength = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (typeof this.data[x][y] === "object" && this.data[x][y] !== null) {
          if (this.data[x][y].sunk) currentSunkLength++;
        }
      }
    }
    if (allShipsLength === currentSunkLength) return true;
    else return false;
  }

  placeShip(coord, ship) {
    const [x, y] = coord;
    const coordsSuit = this.#coordsSuit(x, y, ship);
    if (coordsSuit) {
      let placeSuits = this.#placeSuits(x, y, ship);
      if (placeSuits) {
        this.#addShipToBoard(x, y, ship);
        return true;
      } else return false;
    } else return false;
  }

  clear() {
    this.data = this.#createEmptyBoard();
  }

  placeShipsRandomly() {
    this.clear();
    const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    lengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.round(Math.random());
        if (length === 1) placed = this.placeShip([x, y], new Ship(length));
        else {
          placed = this.placeShip(
            [x, y],
            new Ship(length, Boolean(isVertical)),
          );
        }
      }
    });
  }

  receiveAttack(coord) {
    let [x, y] = coord;
    x = Number(x);
    y = Number(y);
    if (this.allShipsSunk()) return false;
    // ship attacked
    if (this.data[x][y] !== null && this.data[x][y] !== "missed") {
      this.data[x][y].hit();
      this.#trackHitsAroundShip(x, y, this.data[x][y]);
      return true;
      // missed
    } else {
      this.data[x][y] = "missed";
      return false;
    }
  }
}
