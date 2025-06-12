export class Ship {
  constructor(length, isVertical = false) {
    (this.length = length),
      (this.isVertical = isVertical),
      (this.timesHit = 0),
      (this.sunk = false);
  }
  hit() {
    this.timesHit++;
    this.isSunk();
  }
  isSunk() {
    if (this.timesHit >= this.length) this.sunk = true;
  }
}
