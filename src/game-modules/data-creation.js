import { Player } from "../game-modules/player.js";
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

player2.gameboard.placeShipsRandomly();

export { player1, player2 };
