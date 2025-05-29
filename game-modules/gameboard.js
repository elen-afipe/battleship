const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const lettersIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
function createGrid(){
    const grid = {};
    letters.forEach(letter=>{
        grid[letter]= new Array(10);
    })
    return grid;
}
export class Gameboard {
    constructor(){
        this.data = createGrid();
    }

    #checkPlaceVertical(coord, ship){
            let letterIndexAsNumber = letters.findIndex((element) => element === coord[0])-1
            let x = letters[letterIndexAsNumber]
            let y = coord[1]-1;
            for(let i = 0; i<=ship.length+1; i++){
            if(letterIndexAsNumber >= 0 && letterIndexAsNumber < letters.length){
            while(y<=(coord[1]-1+2)){
                 if(y>=0 && y<=10){
                   if (this.data[x][y]) return false
                 }
                y++
            }
        }
            x = letters[++letterIndexAsNumber]
            y = coord[1]-1
        }
        return true
    }

    #checkPlaceHorizontal(coord, ship){
        let letterIndexAsNumber = letters.findIndex((element) => element === coord[0])-1
        let x = letters[letterIndexAsNumber]
        let y = (coord[1]-1)
        for(let i=0; i<3; i++){
        if(letterIndexAsNumber >= 0 && letterIndexAsNumber < letters.length){
            while(y<=(coord[1]-1+ship.length+1)){
                if(y>=0 && y<=10){
                    if (this.data[x][y]) return false
                }
                    y++
                }
        }
            x = letters[++letterIndexAsNumber]
            y = coord[1]-1
        }
        return true
    }
    placeShip(coords, ship){
        let placeSuits = true;
        if(ship.isVertical) placeSuits = this.#checkPlaceVertical(coords[0], ship)
        else placeSuits = this.#checkPlaceHorizontal(coords[0], ship)

        if(placeSuits){
        coords.forEach(coord=>{
           this.data[coord[0]][coord[1]] = ship
        })
     }
    }
    #trackHitsAroundShip(coord, isSunk){
        if(isSunk){
            //sth
        }else{
            
            // other
        }
    }
    receiveAttack(coord){
        // place signs around ship
        if(this.data[coord[0]][coord[1]] !== undefined && this.data[coord[0]][coord[1]] !== "missed" && this.data[coord[0]][coord[1]] !== "nearShip"){
            this.data[coord[0]][coord[1]].hit();
            // color up to 4 squares around or whole around ship
            this.#trackHitsAroundShip(coord, this.data[coord[0]][coord[1]].sunk)
            
        } else this.data[coord[0]][coord[1]] = "missed"
    }
}