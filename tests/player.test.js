import { Player } from "../game-modules/player.js"
test('there are two players with own gameboard', ()=>{
    const player = new Player("human");
    const ai = new Player("computer");
    expect(player.gameboard).toBeDefined;
    expect(ai.gameboard).toBeDefined;
    expect(player.gameboard).not.toBe(ai.gameboard);
})