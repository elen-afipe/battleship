import { Gameboard } from "../game-modules/gameboard.js";
import { Ship } from "../game-modules/ship.js";
beforeEach(() => {
  const gameboard = new Gameboard();
});
test("gameboard creates empty grid", () => {
  const gameboard = new Gameboard();
  const emptyArray = new Array(10);
  expect(gameboard.data.every((cell) => cell === emptyArray));
});
test("place a ship with length 3", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3, true);
  gameboard.placeShip([0, 2], ship);
  expect(gameboard.data[0][2]).toBe(ship),
    expect(gameboard.data[0][3]).toBe(ship),
    expect(gameboard.data[0][4]).toBe(ship);
});
test("do not place ships inappropriately", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2, true);
  const shipHorizontal = new Ship(2);
  gameboard.placeShip(
    
      [0, 9],
    ship,
  );
  gameboard.placeShip(
      [9, 0],
    shipHorizontal,
  );
  expect(gameboard.data[0][9]).toBe(null),
    expect(gameboard.data[9][0]).toBe(null);
});
test("do not place a vertical ship when another ship is placed there", () => {
  const shipSmall = new Ship(2, true);
  const gameboard = new Gameboard();
  const ship = new Ship(3, true);
  gameboard.placeShip(
    
      [0, 2],
    ship,
  );
  gameboard.placeShip(
    
      [0, 2],
    shipSmall,
  );
  expect(gameboard.data[0][2]).toBe(ship),
    expect(gameboard.data[0][3]).toBe(ship),
    expect(gameboard.data[0][4]).toBe(ship);
});
test("do not place a vertical ship when another ship is placed near", () => {
  const shipSmall = new Ship(1);
  const gameboard = new Gameboard();
  const ship = new Ship(3, true);
  gameboard.placeShip(
      [9, 7],
    ship,
  );
  gameboard.placeShip([8, 6], shipSmall);
  expect(gameboard.data[9][9]).toBe(ship),
    expect(gameboard.data[9][8]).toBe(ship),
    expect(gameboard.data[9][7]).toBe(ship);
  expect(gameboard.data[8][6]).toBe(null);
});

test("do not place a horizontal ship when another ship is placed there", () => {
  const shipSmall = new Ship(2);
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(
      [1, 0],
    ship,
  );
  gameboard.placeShip(
      [1, 0],
    shipSmall,
  );
  expect(gameboard.data[1][0]).toBe(ship),
    expect(gameboard.data[2][0]).toBe(ship),
    expect(gameboard.data[3][0]).toBe(ship);
});

test("do not place a horizontal ship when another ship is placed near", () => {
  const shipSmall = new Ship(1);
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(
      [7, 9],
    ship,
  );
  gameboard.placeShip([6, 8], shipSmall);
  expect(gameboard.data[7][9]).toBe(ship),
    expect(gameboard.data[8][9]).toBe(ship),
    expect(gameboard.data[9][9]).toBe(ship),
    expect(gameboard.data[6][8]).toBe(null);
});

test("attack hits ship and misses in empty space", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(
      [1, 2],
    ship,
  );
  gameboard.receiveAttack([2, 2]);
  gameboard.receiveAttack([2, 5]);
  expect(gameboard.data[2][2].timesHit).toBe(1),
    expect(gameboard.data[2][5]).toBe("missed");
});

test("gives a hint on empty cells when ship is hit but not sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2, true);
  gameboard.placeShip(
      [1, 2],
    ship,
  );
  gameboard.receiveAttack([1, 2]);
  expect(gameboard.data[0][1]).toBe("missed"),
    expect(gameboard.data[0][3]).toBe("missed"),
    expect(gameboard.data[2][1]).toBe("missed"),
    expect(gameboard.data[2][3]).toBe("missed");
});

test("marks cells around vertical ship when it is sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2, true);
  gameboard.placeShip(
      [2, 2],
    ship,
  );
  gameboard.receiveAttack([2, 2]);
  gameboard.receiveAttack([2, 3]);
  expect(gameboard.data[2][2]).not.toBe("missed");
  expect(gameboard.data[1][1]).toBe("missed");
  expect(gameboard.data[2][1]).toBe("missed");
  expect(gameboard.data[3][1]).toBe("missed");
  expect(gameboard.data[1][2]).toBe("missed");
  expect(gameboard.data[1][3]).toBe("missed");
  expect(gameboard.data[1][4]).toBe("missed");
  expect(gameboard.data[2][4]).toBe("missed");
  expect(gameboard.data[3][4]).toBe("missed");
  expect(gameboard.data[3][2]).toBe("missed");
  expect(gameboard.data[3][3]).toBe("missed");
});

test("marks cells around horizontal ship when it is sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(
      [3, 2],
    ship,
  );
  gameboard.receiveAttack([3, 2]);
  gameboard.receiveAttack([4, 2]);
  // gameboard.receiveAttack(["C", 4]);
  expect(gameboard.data[2][1]).toBe("missed"),
    expect(gameboard.data[2][2]).toBe("missed"),
    expect(gameboard.data[2][3]).toBe("missed"),
    expect(gameboard.data[3][3]).toBe("missed"),
    expect(gameboard.data[4][3]).toBe("missed"),
    expect(gameboard.data[5][3]).toBe("missed"),
    expect(gameboard.data[5][2]).toBe("missed"),
    expect(gameboard.data[5][1]).toBe("missed"),
    expect(gameboard.data[4][1]).toBe("missed"),
    expect(gameboard.data[3][1]).toBe("missed");
});
