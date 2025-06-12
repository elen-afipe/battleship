import { Ship } from "../game-modules/ship.js";

test("ship allows to create a carrier with length 5 and 0 hits", () => {
  const Carrier = new Ship(5);
  expect(Carrier.length).toBe(5), expect(Carrier.timesHit).toBe(0);
});

test("when destroyer is hit 2 times, it  is sunk", () => {
  const Destroyer = new Ship(2);
  Destroyer.hit();
  Destroyer.hit();
  expect(Destroyer.sunk).toBeTruthy();
});
