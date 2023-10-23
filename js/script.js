const infoZone__ships = document.getElementById('infoZone__ships')
const actionZone__ships = document.getElementById('actionZone__ships')

//GLOBAL VARIABLED

shipLength = [4,3,3,2]

/////********************************************************* */
//FUNCTION FOR CREATING DIV AS CELLS
/////********************************************************* */


/**
 * function to create a div element named cell 
 * 
 * @param {int} row 
 * @param {int} column 
 * @returns 
 */
const createCell = (row,column) => {
    const cell = document.createElement('DIV')
    cell.style.gridArea = row+'/'+column
    // if(row == 4 && column == 8){
    //     cell.classList.add('shipOnIt')
    // }
    // cell.style.border = '0.1px solid black'
    return cell
    
}
/**
 * function to loads amount of div element for each grid elements cell
 * into DOM
 */
const loadCells = () => {
    fragment1 = document.createDocumentFragment()
    fragment2 = document.createDocumentFragment()

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            fragment1.appendChild(createCell(i,j))
            fragment2.appendChild(createCell(i,j))
        }
    }
    infoZone__ships.appendChild(fragment1)
    actionZone__ships.appendChild(fragment2)
}


/////********************************************************* */
//FUNCTION FOR CREATING SHIPS
/////********************************************************* */

const isShipOnTheWay =  (cells) => {
    //array to storage on it cells concurrences with posibles gris area to process them later
    let posiblesCells = []
    let i = 0
    for (const cell of actionZone__ships.children) {
        // console.log('"'+cell.style.gridArea+'"')
        // console.log('"'+cells[0]+'"')
        if(cell.style.gridArea == cells[i]){
            posiblesCells.push(cell)
            i++
        }
    }
    if(!posiblesCells.some((element) => element.classList.contains('shipOnIt'))){
        console.log('estos son los barcos')
        for (const cellp of posiblesCells) {
            cellp.classList.add('shipOnIt')
            console.log('barco '+cellp.style.gridArea)
        }
        return true
    }    
    return false
}
/**
 * funciton to create array to storage grid areas ship will take 
 * 
 * @param {string} point grid area point to begin the creation ship
 * @param {string} way way which ship will be created in
 * @param {int} length number if cells the ship will take
 * @returns 
 */
const isShipOnIt = (point,way,length) => {
    // point = '10 / 10 / auto / auto'
    console.log('estoy en isOnShip')
    // way = 'up'
    let num = 0
    let substring = ''
//array to storage grid area style of group of cells the ship will be created will take
    let cellGroup = []
    switch (way) {
        case 'right':
        console.log('estamos en la direccion '+way)    
        substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.push(point.slice(0,point.indexOf('/') + 2) + (num + i) + (substring.slice(substring.indexOf(' '))))
            }
            break;
        case 'left':
        console.log('estamos en la direccion '+way)    
        substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.unshift(point.slice(0,point.indexOf('/') + 2) + (num - i) + (substring.slice(substring.indexOf(' '))))
            }
            break;
        case 'up':
        console.log('estamos en la direccion '+way)    
        num = parseInt(point.slice(0,point.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.unshift(((num) - (i))+(point.slice(point.indexOf(' '))))

            }
            break;
        case 'down':
        console.log('estamos en la direccion '+way)    
        num = parseInt(point.slice(0,point.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.push(((num) + (i))+(point.slice(point.indexOf(' '))))
            }
            break;
        }
        
    

    return isShipOnTheWay(cellGroup) 
}
/**
 * function to check if ship to be created is out of limit from board
 * 
 * @param {string} point spicific point of the board game grid area
 * @param {string} way way which ship will be created in
 * @param {int} length number of cell ship will take to grow
 * @returns 
 */
const isOnLimits = (point,way,length) => {
    let num = ''
    let substring = ''
    switch (way) {
        case 'right':
            substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
            if((parseInt(num) + length) <= 10) return true
            break;
        case 'left':
            substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
            if((parseInt(num) - length) >= 0)return true
            break;
        case 'up':
        num = parseInt(point.slice(0,point.indexOf(' ')))
            if((parseInt(num) - length) >= 0)return true
            break;
        case 'down':
        num = parseInt(point.slice(0,point.indexOf(' ')))
            if((parseInt(num) + length) <= 10 ) return true
            break;
    }
    return false
}

/**
 * function to generate a grid area random position
 * 
 * @returns string to determinated posible grid area style
 */
const generateShipRandomPosition = () => {
    const ways = ['up','down','right','left']
    let point = ''
    let way = ''
    //REPEAT THIS ACTION UNTIL FIND A CELL POSITION WITAOUT THIS CLASS
    do{
        do{
            way = ways[Math.floor(Math.random () * ways.length)]
            point = (Math.floor(Math.random() * 10) + 1)+' / '+
                    (Math.floor(Math.random() * 10) + 1)+' / auto / auto'
            //CALLING FINCTION TO CHECK THIS POSITION IS OCCUPED  BY CELL
            //WITH SHIPONIT CLASS
        }while(!isOnLimits(point,way,shipLength[0]))

    }while(!isShipOnIt(point,way,shipLength[0]))

    return point
}

const loadShips = () => {
    while(shipLength.length != 0){
        generateShipRandomPosition()
        shipLength.shift()
    }
    
}
const loadGame = () => {
    // LOAD ALL CELLS INTO DOM
    loadCells()
    // LOAD SHIPS INTO DOM
    loadShips()
}
/**
 * testing funciton
 * 
 * @param {event} event 
 */
const showValue = (event) =>{
    console.log(event.target.style.gridArea)
}

//EVENTS
actionZone__ships.addEventListener('click',showValue)
document.addEventListener('DOMContentLoaded',loadGame)