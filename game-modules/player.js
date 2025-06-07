import { Gameboard } from "./gameboard.js";
export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
    this.turn = this.type === "computer" ? false : true;
    if (this.type === 'computer') {
      this.movesOnBoard = Array.from({ length: 10 }, () => new Array(10).fill(1));
      this.makeMove = () => {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return [x, y]
      } 
  }
  }
}
