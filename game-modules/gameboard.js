const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
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
    #trackHitsAroundShip(coord, ship){
        if(ship.sunk){
            if(ship.isVertical){
                letters.forEach(letter =>{
                    if(this.data[letter][coord[1]] === ship){
                       let letterIndexAsNumber = letters.findIndex((element) => element === letter)
                       const upLetter = (letterIndexAsNumber-1 >= 0 && letterIndexAsNumber-1 < letters.length) ? letters[letterIndexAsNumber-1] : null
                       const downLetter = (letterIndexAsNumber+1 >= 0 && letterIndexAsNumber+1 < letters.length) ? letters[letterIndexAsNumber+1] : null
                       const hitsCells = [[upLetter, coord[1]], [upLetter, coord[1]-1], [upLetter, coord[1]+1], [coord[0], coord[1]-1], [coord[0], coord[1]+1], [downLetter, coord[1]], [downLetter, coord[1]-1], [downLetter, coord[1]+1]]
                       hitsCells.forEach(cell=>{
                        if(cell[0]!==null && cell[1]>=0 && cell[1]<=9){
                            if(this.data[cell[0]][cell[1]] === undefined) this.data[cell[0]][cell[1]] = "near"
                    }})
                    }
                })
            }else{
                let letterIndexAsNumber = letters.findIndex((element) => element === coord[0])
                const upLetter = (letterIndexAsNumber-1 >= 0 && letterIndexAsNumber-1 < letters.length) ? letters[letterIndexAsNumber-1] : null
                const downLetter = (letterIndexAsNumber+1 >= 0 && letterIndexAsNumber+1 < letters.length) ? letters[letterIndexAsNumber+1] : null
                for(let i=0; i<=9; i++){
                    const hitsCells = [[upLetter, i], [upLetter, i-1], [upLetter, i+1], [coord[0], i-1], [coord[0], i+1], [downLetter, i], [downLetter, i-1], [downLetter, i+1]]
                    hitsCells.forEach(cell=>{
                        if(cell[0]!==null && cell[1]>=0 && cell[1]<=9){
                            if(this.data[cell[0]][cell[1]] === undefined) this.data[cell[0]][cell[1]] = "near"
                    }})
                }
            }
        } else {
        let letterIndexAsNumber = letters.findIndex((element) => element === coord[0])
        let y = (coord[1])
        const upperLetter = (letterIndexAsNumber-1 >= 0 && letterIndexAsNumber-1 < letters.length) ? letters[letterIndexAsNumber-1] : null
        let downLetter = (letterIndexAsNumber+1 >= 0 && letterIndexAsNumber+1 < letters.length) ? letters[letterIndexAsNumber+1] : null
        let hitsCells = [[upperLetter, y-1], [upperLetter, y+1], [downLetter, y-1], [downLetter, y+1]]
        hitsCells.forEach(cell=>{
            if(cell[0]!==null && y>=0 && y<=10){
                if(this.data[cell[0]][cell[1]] === undefined) this.data[cell[0]][cell[1]] = "near"
        }})
    }
    }
    receiveAttack(coord){
        if(this.data[coord[0]][coord[1]] !== undefined && this.data[coord[0]][coord[1]] !== "missed" && this.data[coord[0]][coord[1]] !== "near"){
            this.data[coord[0]][coord[1]].hit();
            // color up to 4 squares around or whole space around ship
            this.#trackHitsAroundShip(coord, this.data[coord[0]][coord[1]])
        } else this.data[coord[0]][coord[1]] = "missed"
    }
}