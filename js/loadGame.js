const infoZone__ships = document.getElementById('infoZone__ships')
const actionZone__ships = document.getElementById('actionZone__ships')
let iterator = 0
const postionBall = [
'a1','a2','a3','a4','a5','a6','a7','a8','a9','a10',
'b1','b2','b3','b4','b5','b6','b7','b8','b9','b10',
'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10',
'd1','d2','d3','d4','d5','d6','d7','d8','d9','d10',
'e1','e2','e3','e4','e5','e6','e7','e8','e9','e10',
'f1','f2','f3','f4','f5','f6','f7','f8','f9','f10',
'g1','g2','g3','g4','g5','g6','g7','g8','g9','g10',
'h1','h2','h3','h4','h5','h6','h7','h8','h9','h10',
'i1','i2','i3','i4','i5','i6','i7','i8','i9','i10',
'j1','j2','j3','j4','j5','j6','j7','j8','j9','j10',
]
// const postionPlayer = [
// 'pa1','pa2','pa3','pa4','pa5','pa6','pa7','pa8','pa9','pa10',
// 'pb1','pb2','pb3','pb4','pb5','pb6','pb7','pb8','pb9','pb10',
// 'pc1','pc2','pc3','pc4','pc5','pc6','pc7','pc8','pc9','pc10',
// 'pd1','pd2','pd3','pd4','pd5','pd6','pd7','pd8','pd9','pd10',
// 'pe1','pe2','pe3','pe4','pe5','pe6','pe7','pe8','pe9','pe10',
// 'ef1','ef2','ef3','ef4','ef5','ef6','ef7','ef8','ef9','ef10',
// 'eg1','eg2','eg3','eg4','eg5','eg6','eg7','eg8','eg9','eg10',
// 'eh1','eh2','eh3','eh4','eh5','eh6','eh7','eh8','eh9','eh10',
// 'ei1','ei2','ei3','ei4','ei5','ei6','ei7','ei8','ei9','ei10',
// 'ej1','ej2','ej3','ej4','ej5','ej6','ej7','ej8','ej9','ej10',
// ]

//GLOBAL VARIABLED

shipLength = [5,4,3,3,2]
imagesGridAreas = []

/////********************************************************* */
//FUNCTION FOR CREATING DIV AS CELLS
/////********************************************************* */
const createElement = (tag,clas1,clas2 = false,iD = false) => {
    const element = document.createElement(tag)
    element.classList.add(clas1)
    if(clas2)
    element.classList.add(clas2)
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

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            const cell1 = createCell(i,j)
            cell1.classList.add('p'+postionBall[i])
            cell1.appendChild(createElement('DIV','amunnition', 'ballEnemyOutside','p'+postionBall[i]))
            fragment1.appendChild(cell1)
            const cell2 = createCell(i,j)
            cell2.classList.add('e'+postionBall[i])
            cell2.appendChild(createElement('DIV','amunnition','e'+postionBall[i]))
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
    let substring = ''
    //with this code get griArea style from first and las element
    let firstArea = elements[0].style.gridArea
    let lastArea = elements[elements.length - 1].style.gridArea
    //with this code get first number to become in a row reference in the new grid area
    let firstRow = firstArea.slice(0,firstArea.indexOf(' '))
    //with this code get first number to become in a row reference in the new grid area
    let lastRow = lastArea.slice(0,lastArea.indexOf(' '))
    //with this code get first number to become in a column reference in the new grid area
    substring = firstArea.slice(firstArea.indexOf('/ ') + 2)
    let firstColumn = parseInt(substring.slice(0,substring.indexOf(' ')))
    //with this code get first number to become in a column reference in the new grid area
    substring = lastArea.slice(lastArea.indexOf('/ ') + 2)
    let lastColumn = parseInt(substring.slice(0,substring.indexOf(' ')))
    if(way == 'Right' || way =='Left'){
        //return new grid area created in only a line for example 
        //all girdAreas from array element given --> grid-area : 3 / 4 / auto / auto  grid-area : 3 / 5 / auto / auto grid-area : 3 / 6 / auto / auto grid-area : 3 / 7 / auto / auto
        //string for result 3 / 4 / 3 / 7
        imagesGridAreas.push([way,firstRow + ' / ' + firstColumn + ' / ' +firstRow + ' / ' + (lastColumn + 1) ])
    }else{
         //return new grid area created in only a line for example 
         //all girdAreas from array element given --> grid-area : 3 / 4 / auto / auto  grid-area : 4 / 4 / auto / auto grid-area : 5 / 4 / auto / auto grid-area : 6 / 4 / auto / auto
         //string for result 3 / 4 / 6 / 4
         
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
    //array to storage on it cells concurrences with posibles grid area to process them later
    let posiblesCells = []
    //array which storage grid areas newly processed
    let imagesGridAreas = []
    let i = 0
    for (const cell of element.children) {
        if(cell.style.gridArea == cells[i]){
            posiblesCells.push(cell)
            i++
        }
    }
    if(!posiblesCells.some((element) => element.classList.contains('shipOnIt'))){
        for (const cellp of posiblesCells) {
            cellp.classList.add('shipOnIt')
            cellp.firstElementChild.classList.add('amunnition__red')
        }

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
    // way = 'up'
    let num = 0
    let substring = ''
//array to storage grid area style of group of cells the ship will be created will take
    let cellGroup = []
    switch (way) {
        case 'Right':   
        substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.push(point.slice(0,point.indexOf('/') + 2) + (num + i) + (substring.slice(substring.indexOf(' '))))
            }
            break;
        case 'Left': 
        substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.unshift(point.slice(0,point.indexOf('/') + 2) + (num - i) + (substring.slice(substring.indexOf(' '))))
            }
            break;
        case 'Up':  
        num = parseInt(point.slice(0,point.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.unshift(((num) - (i))+(point.slice(point.indexOf(' '))))

            }
            break;
        case 'Down': 
        num = parseInt(point.slice(0,point.indexOf(' ')))
            for (let i = 0; i < length; i++) {
                cellGroup.push(((num) + (i))+(point.slice(point.indexOf(' '))))
            }
            break;
        }
        
    

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
            substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
            if((parseInt(num) + length) <= 10) return true
            break;
        case 'Left':
            substring = point.slice(point.indexOf('/ ') + 2)
            num = parseInt(substring.slice(0,substring.indexOf(' ')))
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
            point = (Math.floor(Math.random() * 10) + 1)+' / '+
                    (Math.floor(Math.random() * 10) + 1)+' / auto / auto'
            //CALLING FINCTION TO CHECK THIS POSITION IS OCCUPED  BY CELL
            //WITH SHIPONIT CLASS
        }while(!isOnLimits(point,way,auxLength[0]))

    }while(!isShipOnIt(point,way,auxLength[0],element))

    return point
}
/**
 * function to load five ships in each board 
 */
const loadShips = () => {
    auxLength = [...shipLength]
    while(auxLength.length != 0){
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
    //HAY QUE DAR BIEN LAS RUTAS Y ECHAR UN VIASTAZO SI LA SITNTAZIS DE LOS GRIS AREAS ESTASN BIEN
}
const removeGrid = (board,arrayAreas) => {
    let fragmentCells = document.createDocumentFragment()
    Array.from(board.children).forEach(element => {
        fragmentCells.appendChild(element)
    });
    board.innerHTML = ''
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
       removeGrid(infoZone__ships,imagesGridAreas.slice(5))
       removeGrid(actionZone__ships,imagesGridAreas.slice(0,5))
    }
    
    
    /////********************************************************* */
//FUNCTION FOR GAME LOGIC
/////********************************************************* */
/**
 * function to create a specific item and give a classList depending of color given as parameter
 * 
 * @param {string} color 
 * @returns htmldivelement
 */
const createAmunnition =  (color) => {
    let amunnition = document.createElement('DIV')
    amunnition.classList.add('amunnition_'+color)
    return amunnition
}/**
function to insert into a spedific element given as parameter amunnition element
 * 
 * @param {HTMLDivElement} element 
 * @param {string} color 
 */
const generateShoot = (element,color) => {
    element.appendChild(createAmunnition(color))
    
}
/**
 * function to call generateShoot() function take as parameter a color depending of element even.target type
 * 
 * @param {event} event 
 */
const gameTurn = (event) => {
    //storage event.target into short name varibale 
    const e = event.target
    //conditional to check if click is on a image o not
    if(e.tagName != 'IMG'){
        //calling function to generate a shoot with a red amunnition
        generateShoot(e,'white')
    }else{
        //calling function to generate a shoot with a white amunnition
        generateShoot(e,'red')
    }

}

//EVENTS
actionZone__ships.addEventListener('click',gameTurn)
infoZone__ships.addEventListener('click',gameTurn)
document.addEventListener('DOMContentLoaded',loadGame)