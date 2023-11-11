const infoZone__ships = document.getElementById('infoZone__ships')
const actionZone__ships = document.getElementById('actionZone__ships')
let iterator = 0
let matriz = [
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5", "j5"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6", "j6"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7", "j7"],
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8", "j8"],
    ["a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9", "j9"],
    ["a10", "b10", "c10", "d10", "e10", "f10", "g10", "h10", "i10", "j10"]
  ]
  
let positionBall = [
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5", "j5",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6", "j6",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7", "j7",
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8", "j8",
    "a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9", "j9",
    "a10", "b10", "c10", "d10", "e10", "f10", "g10", "h10", "i10", "j10"
];
let EnemyShipsMap = []
let PlayerShipsMap = []

//GLOBAL VARIABLED
let dateBegin = new Date()
shipLength = [5,4,3,3,2]
imagesGridAreas = []

/////********************************************************* */
//FUNCTION FOR CREATING DIV AS CELLS
/////********************************************************* */
const createElement = (tag,clas1,clas2 = false, clas3 = false,iD = false) => {
    const element = document.createElement(tag)
    element.classList.add(clas1)
    if(clas2)
    element.classList.add(clas2)
    if(clas3)
    element.classList.add(clas3)
    if(iD)
    element.id = iD
    return element
}
/**
 * function to create a div element named cell 
 * 
 * @param {int} row 
 * @param {int} column 
 * @returns 
 */
const createCell = (row,column) => {
    const cell = createElement('DIV','cell')
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
    let position = ''
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            position = ( i * 10 ) + j
            const cell1 = createCell(i+1,j+1)
            cell1.classList.add('e'+positionBall[position])
            cell1.id = '_e'+positionBall[position]
            cell1.appendChild(createElement('DIV','amunnition', 'hide','ballEnemyOutside','e'+positionBall[position]))
            fragment1.appendChild(cell1)
            const cell2 = createCell(i+1,j+1)
            cell2.classList.add('p'+positionBall[position])
            cell2.id = '_p'+positionBall[position]
            cell2.appendChild(createElement('DIV','amunnition', 'hide','p'+positionBall[position]))
            fragment2.appendChild(cell2)
        }
    }
    infoZone__ships.appendChild(fragment1)
    actionZone__ships.appendChild(fragment2)
}


/////********************************************************* */
//FUNCTION FOR CREATING SHIPS
/////********************************************************* */
/**
 * function to porcess a group of grid areas and covert into single grid area as string type, then push this 
 * proccessed elemnt an way element as array into imagesGridArea global array
 * 
 * @param {Array} elements 
 * @param {string} way 
 */
const processGridAreas = (elements,way) => {
    // console.log(' esta es al direccion '+way)
    // console.log('esye es el array de elemento ')
    // elements.forEach(element => {
    //     console.log('element '+element.style.gridArea)
    // });
    let substring = ''
    //with this code get griArea style from first and las element
    // console.log('este es el elemetno que falla '+elements[0])
    let firstArea = elements[0].style.gridArea
    // console.log('esto es firs area '+firstArea)
    let lastArea = elements[elements.length - 1].style.gridArea
    //with this code get first number to become in a row reference in the new grid area
    let firstRow = firstArea.slice(0,firstArea.indexOf(' '))
    //with this code get first number to become in a row reference in the new grid area
    let lastRow = lastArea.slice(0,lastArea.indexOf(' '))
    //with this code get first number to become in a column reference in the new grid area
    substring = firstArea.slice(firstArea.indexOf('/ ') + 2)
    // console.log('este es el subsstirm ('+substring+')')
    let firstColumn = parseInt(substring)
    // console.log('esto es firdt colum '+substring.slice(0,substring.indexOf(' ')))
    //with this code get first number to become in a column reference in the new grid area
    substring = lastArea.slice(lastArea.indexOf('/ ') + 2)
    let lastColumn = parseInt(substring)
    if(way == 'Right' || way =='Left'){
        //return new grid area created in only a line for example 
        //all girdAreas from array element given --> grid-area : 3 / 4 / auto / auto  grid-area : 3 / 5 / auto / auto grid-area : 3 / 6 / auto / auto grid-area : 3 / 7 / auto / auto
        //string for result 3 / 4 / 3 / 7
        // console.log('esta es la que formo '+(firstRow + ' / ' + firstColumn + ' / ' +firstRow + ' / ' + (lastColumn + 1)) )
        imagesGridAreas.push([way,firstRow + ' / ' + firstColumn + ' / ' +firstRow + ' / ' + (lastColumn + 1)])
    }else{
         //return new grid area created in only a line for example 
         //all girdAreas from array element given --> grid-area : 3 / 4 / auto / auto  grid-area : 4 / 4 / auto / auto grid-area : 5 / 4 / auto / auto grid-area : 6 / 4 / auto / auto
         //string for result 3 / 4 / 6 / 4
        //  console.log('esta ed la que formo '+(firstRow + ' / ' + firstColumn + ' / ' + (parseInt(lastRow) + 1) + ' / ' + firstColumn))
        imagesGridAreas.push([way, firstRow + ' / ' + firstColumn + ' / ' + (parseInt(lastRow) + 1) + ' / ' + firstColumn])
    }
}
/**
 * function to check children from element which has grid area equals than cells array has,it means them
 * are not shipOnIt className,
 * which determinate thid group of cells are free to take for a ship position
 * 
 * @param {Array} cells 
 * @param {HTMLDivElement} element 
 * @returns 
 */
const isShipOnTheWay =  (cells,element,way) => {
    // console.log('este es el arrya cando entroe en el metodo '+cells[0])
    //array to storage on it cells concurrences with posibles grid area to process them later
    let posiblesCells = []
    //array which storage grid areas newly processed
    let imagesGridAreas = []
    let i = 0
    // console.log('esto son con los que entro yo ')
    // cells.forEach(element => {
    //     console.log('grid area '+element)
    // });
    for (const cell of element.children) {
        // console.log('este es el gri area de las celdas en genera ('+cell.style.gridArea+')')
        
        if(cell.style.gridArea === cells[i]){
            posiblesCells.push(cell)
            i++
        }
    }
    if(!posiblesCells.some((element) => element.classList.contains('shipOnIt'))){
        for (const cellp of posiblesCells) {
            cellp.classList.add('shipOnIt')
            cellp.firstElementChild.classList.add('amunnition__red')
        }
        // console.log('entro en el if cone este array '+posiblesCells.length)
        imagesGridAreas.push(processGridAreas(posiblesCells,way))
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
const isShipOnIt = (point,way,length,element) => {
    // point = '10 / 10 / auto / auto'
    // console.log('este es el point '+point)
    // way = 'up'
    let num = 0
    let substring = ''
//array to storage grid area style of group of cells the ship will be created will take
    let cellGroup = []
    switch (way) {
        case 'Right':   
        substring = point.slice(point.indexOf('/ ') + 2)
            // num = parseInt(substring.slice(0,substring.indexOf(' ')))
            num = parseInt(substring)
            for (let i = 0; i < length; i++) {
                cellGroup.push(point.slice(0,point.indexOf('/') + 2) + (num + i))
                // console.log('construccion cuanndo entro en right ' +point.slice(0,point.indexOf('/') + 2) + (num + i))
            }
            break;
            case 'Left': 
            substring = point.slice(point.indexOf('/ ') + 2)
            // num = parseInt(substring.slice(0,substring.indexOf(' ')))
            num = parseInt(substring)
            for (let i = 0; i < length; i++) {
                cellGroup.unshift(point.slice(0,point.indexOf('/') + 2) + (num - i))
                // console.log('construccion cuanndo entro en left ' +point.slice(0,point.indexOf('/') + 2) + (num - i))
            }
            break;
        case 'Up':  
        num = parseInt(point.slice(0,point.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.unshift(((num) - (i))+(point.slice(point.indexOf(' '))))
                // console.log('esta es la construccion cuando enstramos en up '+((num) - (i))+(point.slice(point.indexOf(' '))))
            }
            break;
        case 'Down': 
        num = parseInt(point.slice(0,point.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.push(((num) + (i))+(point.slice(point.indexOf(' '))))
                // console.log('esta es la construcion cuando entramos en down '+((num) + (i))+(point.slice(point.indexOf(' '))))
            }
            break;
        }
        
    // console.log('este es el array de celdas '+cellGroup.length)

    return isShipOnTheWay(cellGroup,element,way) 
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
        case 'Right':
            // substring = point.slice(point.indexOf('/ ') + 2)
            // console.log('este es el primero substring en erigth ('+substring+')')
            num = parseInt(substring)
            // console.log('este es el num ('+num+')')
            if((parseInt(num) + length) <= 10) return true
            break;
            case 'Left':
                substring = point.slice(point.indexOf('/ ') + 2)
                // console.log('este es el primero substring en left ('+substring+')')
                num = parseInt(substring)
                // console.log('este es el num ('+num+')')
            if((parseInt(num) - length) >= 0)return true
            break;
        case 'Up':
        num = parseInt(point.slice(0,point.indexOf(' ')))
            if((parseInt(num) - length) >= 0)return true
            break;
        case 'Down':
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
const generateShipRandomPosition = (element) => {
    const ways = ['Up','Down','Right','Left']
    let point = ''
    let way = ''
    //REPEAT THIS ACTION UNTIL FIND A CELL POSITION WITAOUT THIS CLASS
    do{
        do{
            way = ways[Math.floor(Math.random () * ways.length)]
            // console.log('esta es la direccion random '+way)
            point = (Math.floor(Math.random() * 10) + 1)+' / '+
            (Math.floor(Math.random() * 10) + 1)
            
            // ' / auto / auto'
            //CALLING FINCTION TO CHECK THIS POSITION IS OCCUPED  BY CELL
            //WITH SHIPONIT CLASS
        }while(!isOnLimits(point,way,auxLength[0]))
        
        // console.log('esta es la direccion random cuando pasa el primer bucle'+way)
    }while(!isShipOnIt(point,way,auxLength[0],element))
    // console.log('este es en punto valido '+point)
    return point
}
/**
 * function to load five ships in each board 
 */
const loadShips = () => {
    auxLength = [...shipLength]
    // console.log('esta es la longitud del array de posiciones '+auxLength.length)
    while(auxLength.length != 0){
        // console.log('esta es la posicion random que me manda '+generateShipRandomPosition(actionZone__ships))
        generateShipRandomPosition(actionZone__ships)
        auxLength.shift()
    }
    //rechage values from lenght array
    auxLength = [...shipLength]
    while(auxLength.length != 0){
        generateShipRandomPosition(infoZone__ships)
        auxLength.shift()
    }
    
}
const loadImages = (element,auxArray) => {
    fragmentImages = document.createDocumentFragment()
    // console.log('elemento del array ')
    // auxArray.forEach(elementp => {
    //     console.log('este es el elemento '+elementp)
    // });
    for (let i = 0; i < 5; i++) {
        //create an image element with classList ship
        ship = createElement('IMG','ship')
        //set src value iterate shipsLenght array and 
        //first value from imagesGridArea array which is way images will take
        ship.src = './assets/images/newClassic/ships/BattleshipInterfaceShipsCells'
        +shipLength[i]+auxArray[i][0]+'.png'
        //set gird area valur form iteration from auxArray[1] array
        ship.style.gridArea = auxArray[i][1] 
        fragmentImages.appendChild(ship)
    }
    element.appendChild(fragmentImages)
}
const removeGrid = (board,arrayAreas,map) => {
    // console.log('para el mapa '+board.classList)
    let fragmentCells = document.createDocumentFragment()
    Array.from(board.children).forEach(element => {
        // console.log('la clase que tiene cada celda '+element.classList)
        if(element.classList.contains('shipOnIt')){
            map.push('.' + element.id)
            element.classList.remove('shipOnIt')
        }else{
            map.push(element.id)
        }
        fragmentCells.appendChild(element)
    });
    // console.log('este es el mapa de '+board.classList)
    // console.log(map)
    
    board.innerHTML = ''
    if(board.classList.contains('actionZone__ships'))
    loadImages(board,arrayAreas)
    board.appendChild(fragmentCells)
}
    
    /**
     * functio to call other function to load cells and ships into two differents board to start the game
    */
   const loadGame = () => {
       // LOAD ALL CELLS INTO DOM
       loadCells()
       // LOAD PROTOYPE SHIPS INTO DOM
       loadShips()
       // REOMVE AND STROAGE ALL ELEMENTS FROM EACH BOARD 
       removeGrid(infoZone__ships,imagesGridAreas.slice(5),PlayerShipsMap)
       removeGrid(actionZone__ships,imagesGridAreas.slice(0,5),EnemyShipsMap)
    }

//EVENTS
document.addEventListener('DOMContentLoaded',loadGame)