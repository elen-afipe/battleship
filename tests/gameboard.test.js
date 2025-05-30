import {Gameboard} from "../game-modules/gameboard.js"
import { Ship } from "../game-modules/ship.js";
beforeEach(()=>{
    const gameboard = new Gameboard;
    const ship = new Ship(3);
})
test('gameboard creates empty grid', ()=>{
    const gameboard = new Gameboard;
    const properties = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const emptyArray = new Array(10);
    properties.forEach(property => expect(gameboard.data).toHaveProperty(property)),
    properties.forEach(property => expect(gameboard.data[property]).toEqual(emptyArray))
})
test('place a ship with length 3', ()=>{
    const gameboard = new Gameboard;
    const ship = new Ship(3);
    gameboard.placeShip([["B", 2], ["C", 2], ["D", 2]], ship)
    expect(gameboard.data["B"][2]).toBe(ship),
    expect(gameboard.data["C"][2]).toBe(ship),
    expect(gameboard.data["D"][2]).toBe(ship)
})
test('do not place a vertical ship when another ship is placed there', ()=>{
    const shipSmall = new Ship(2)
    const gameboard = new Gameboard;
    const ship = new Ship(3, true);
    gameboard.placeShip([["B", 2], ["C", 2], ["D", 2]], ship)
    gameboard.placeShip([["B", 2], ["C", 2]], shipSmall)
    expect(gameboard.data["B"][2]).toBe(ship),
    expect(gameboard.data["C"][2]).toBe(ship),
    expect(gameboard.data["D"][2]).toBe(ship)
})
test('do not place a vertical ship when another ship is placed near', ()=>{
    const shipSmall = new Ship(1)
    const gameboard = new Gameboard;
    const ship = new Ship(3, true);
    gameboard.placeShip([["F", 9], ["G", 9], ["H", 9]], ship)
    gameboard.placeShip([["J", 9]], shipSmall)
    expect(gameboard.data["F"][9]).toBe(ship),
    expect(gameboard.data["G"][9]).toBe(ship),
    expect(gameboard.data["H"][9]).toBe(ship)
    expect(gameboard.data["J"][9]).toBe(shipSmall)
})
test('do not place a horizontal ship when another ship is placed there', ()=>{
    const shipSmall = new Ship(2)
    const gameboard = new Gameboard;
    const ship = new Ship(3);
    gameboard.placeShip([["A", 1], ["A", 2], ["A", 3]], ship)
    gameboard.placeShip([["A", 1], ["A", 2]], shipSmall)
    expect(gameboard.data["A"][1]).toBe(ship),
    expect(gameboard.data["A"][2]).toBe(ship),
    expect(gameboard.data["A"][3]).toBe(ship)
})

test('do not place a horizontal ship when another ship is placed near', ()=>{
    const shipSmall = new Ship(1)
    const gameboard = new Gameboard;
    const ship = new Ship(3);
    gameboard.placeShip([["J", 8], ["J", 9], ["J", 10]], ship)
    gameboard.placeShip([["I", 8]], shipSmall)
    expect(gameboard.data["J"][8]).toBe(ship),
    expect(gameboard.data["J"][9]).toBe(ship),
    expect(gameboard.data["J"][10]).toBe(ship),
    expect(gameboard.data["I"][8]).toBe(undefined)
})

test('attack hits ship and misses in empty space', ()=>{
    const gameboard = new Gameboard;
    const ship = new Ship(3);
    gameboard.placeShip([["B", 2], ["C", 2], ["D", 2]], ship)
    gameboard.receiveAttack(["C", 2])
    gameboard.receiveAttack(["A", 5])
    expect(gameboard.data["C"][2].timesHit).toBe(1),
    expect(gameboard.data["A"][5]).toBe("missed")
})

test('gives a hint on empty cells when ship is hit but not sunk', ()=>{
    const gameboard = new Gameboard;
    const ship = new Ship(2);
    gameboard.placeShip([["C", 2], ["D", 2]], ship)
    gameboard.receiveAttack(["C", 2])
    expect(gameboard.data["B"][1]).toBe("near"),
    expect(gameboard.data["B"][3]).toBe("near"),
    expect(gameboard.data["D"][1]).toBe("near"),
    expect(gameboard.data["D"][3]).toBe("near")
})

test('marks cells around vertical ship when it is sunk', ()=>{
    const gameboard = new Gameboard;
    const ship = new Ship(2, true);
    gameboard.placeShip([["B", 2], ["C", 2]], ship)
    gameboard.receiveAttack(["B", 2])
    gameboard.receiveAttack(["C", 2])
    expect(gameboard.data["A"][1]).toBe("near"),
    expect(gameboard.data["B"][1]).toBe("near"),
    expect(gameboard.data["C"][1]).toBe("near"),
    expect(gameboard.data["A"][3]).toBe("near"),
    expect(gameboard.data["B"][3]).toBe("near"),
    expect(gameboard.data["C"][3]).toBe("near"),
    expect(gameboard.data["A"][2]).toBe("near"),
    expect(gameboard.data["D"][1]).toBe("near"),
    expect(gameboard.data["D"][2]).toBe("near"),
    expect(gameboard.data["D"][3]).toBe("near")
})

test('marks cells around horizontal ship when it is sunk', ()=>{
    const gameboard = new Gameboard;
    const ship = new Ship(2);
    gameboard.placeShip([["C", 3], ["C", 4]], ship)
    gameboard.receiveAttack(["C", 2])
    gameboard.receiveAttack(["C", 3])
    gameboard.receiveAttack(["C", 4])
    expect(gameboard.data["B"][2]).toBe("near"),
    expect(gameboard.data["B"][3]).toBe("near"),
    expect(gameboard.data["B"][4]).toBe("near"),
    expect(gameboard.data["B"][5]).toBe("near"),
    expect(gameboard.data["C"][2]).toBe("missed"),
    expect(gameboard.data["C"][5]).toBe("near"),
    expect(gameboard.data["D"][2]).toBe("near"),
    expect(gameboard.data["D"][3]).toBe("near"),
    expect(gameboard.data["D"][4]).toBe("near"),
    expect(gameboard.data["D"][5]).toBe("near")
})