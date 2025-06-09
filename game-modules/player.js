import { Gameboard } from "./gameboard.js";
export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
    this.turn = this.type === "computer" ? false : true;
    if (this.type === "computer") {
      // this.hitsMap = Array.from({ length: 10 }, () => new Array(10).fill(0.5));
      this.chooseMove = () => {
        if (this.hitMoves.length > 0) {
          const x = this.hitMoves[0][0];
          const y = this.hitMoves[0][1];
          this.hitMoves.shift();
          return [x, y];
        } else {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          return [x, y];
        }
      };
      this.hitMoves = [];
      this.addHitMoves = (x, y) => {
        const moves = [
          [x, y - 1],
          [x + 1, y],
          [x, y + 1],
          [x - 1, y],
        ];
        moves.forEach((move) => {
          if (move[0] >= 0 && move[0] <= 9 && move[1] >= 0 && move[1] <= 9) {
            this.hitMoves.push(move);
          }
        });
      };
    }
  }
}
