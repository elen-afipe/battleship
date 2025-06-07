import { Player } from "../game-modules/player.js";
import { Ship } from "../game-modules/ship.js";
export function createPlayers(gameType = "computer") {
  if (gameType === "computer") {
    const player1 = new Player("person");
    const player2 = new Player("computer");
    return { player1, player2 };
  } else {
    const player1 = new Player("person");
    const player2 = new Player("person");
    return { player1, player2 };
  }
}

const { player1, player2 } = createPlayers();
player1.gameboard.placeShipsRandomly();
// player1.gameboard.placeShip([0, 0], new Ship(1))
// player1.gameboard.placeShip([2, 0], new Ship(1))
// player1.gameboard.placeShip([7, 2], new Ship(1))
// player1.gameboard.placeShip([9, 7], new Ship(1))
// player1.gameboard.placeShip([2, 2], new Ship(2, true))
// player1.gameboard.placeShip([0, 5], new Ship(2, true))
// player1.gameboard.placeShip([4, 3], new Ship(2))
// player1.gameboard.placeShip([4, 5], new Ship(3, true))
// player1.gameboard.placeShip([7, 9], new Ship(3))
// player1.gameboard.placeShip([9, 1], new Ship(4, true))

player2.gameboard.placeShipsRandomly();
// player2.gameboard.placeShip([0, 1], new Ship(1))
// player2.gameboard.placeShip([2, 1], new Ship(1))
// player2.gameboard.placeShip([1, 4], new Ship(1))
// player2.gameboard.placeShip([7, 8], new Ship(1))
// player2.gameboard.placeShip([4, 2], new Ship(2))
// player2.gameboard.placeShip([2, 9], new Ship(2))
// player2.gameboard.placeShip([8, 0], new Ship(2))
// player2.gameboard.placeShip([9, 3], new Ship(3, true))
// player2.gameboard.placeShip([1, 7], new Ship(3))
// player2.gameboard.placeShip([5, 5], new Ship(4, true))

export { player1, player2 };
