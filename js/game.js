//VARIABLES
//global variable to check if shoot hit a ship
let shootOnTarget = false
//global varibale to storage the last shot
let lastShoot
//global varibel to storage cell sorrounded the last shoot on target
let cellSorround
//global variable to detect if shootOnTarget is sorrounded
let sorrounded = true
//global variables to count how many shoot made each player
let enemyShoots = 0
let enemyShootsOnTarget = 0
let playerShoots = 0
let playerShootsOnTarget = 0
//global variable for turn management
let turnPlayer = true
//golbal varable to storage first ship position for machine intelligence
let firstPosition = null

//gloabal vairbales araay to storage letter and numbers corerponding to cell positions
const letters = ['a','b','c','d','e','f','g','h','i','j']
const numbers = ['1','2','3','4','5','6','7','8','9','10']
/**
 * function to filter tagName of event.target to call or not function 
 * to generate an animation
 * 
 * @param {event} event 
 */
const shoot = (event = false, cellId) => {
    if(event){
        const e = event.target
        // console.log('aqui es donde pulso '+e.classList)
        if(e.tagName === 'DIV'){
            if(turnPlayer){
                generateAnimation(e,PlayerShipsMap)
                turnPlayer = false
                e.addEventListener('animationend',machineTurn)
            }
        }
    }else{
        Array.from(actionZone__ships.children).forEach((cell) => {
            if(cell.getAttribute('id') == cellId){
                generateAnimation(cell,EnemyShipsMap)
                cell.classList.add('disabled')
            }
        })
        turnPlayer = true
    }
}
/**
 * function to return an element which classList matches position parameter
 * 
 * @param {string} position 
 * @returns HTMLDIVELEMENT
 */
const getCellByPosition = (position) => {
    for (const element of Array.from(actionZone__ships.children)) {
        if(element.classList.contains('p'+position))
        return  element
    }
}
/**
 * function to get a specific cells by id given as parameter
 * 
 * @param {string} cellId 
 * @param {HTMLAllCollection} cells 
 */
const getCellById = (cellId,cells) => {
    console.log('este es el id que tenemos que interpretar '+cellId)
    for(const cell of Array.from(cells.children)){
        console.log('este es cada uno de los id '+cell.id)
        if(cell.id == cellId){
            console.log('esta es la celda que coinicde ')
            return cell
        }
    }
}
/**
 * function to generate a random position to shoot while this postision is not choosen yet
 * 
 * @returns string
 */
const randomPosition = () => {
    let randomPosition = 0
    let cell
    let position
    do{
        randomPosition = Math.floor(Math.random() * positionBall.length)
        position = positionBall[randomPosition]
        cell = getCellByPosition(position)
        console.log(cell.classList)
    }while(cell.classList.contains('disabled'))

    return positionBall[randomPosition]
}
/**
 * function to detect any ship in board by look into its classList
 * 
 * @returns string
 */
const detectShip = () => {
    for (const cell of Array.from(actionZone__ships.children)) {
        if(cell.classList.contains('cell')){
            const son = cell.firstElementChild
            if(son.classList.contains('ballShootRed')){
                return cell.id
            }
        }
    }
    return null
}
/**
 * function to generate an id depeding of parameters add or quit a specific position form number or letter from any id from cells
 * 
 * @param {number} itemPosition 
 * @param {Array} items 
 * @param {string or number} item 
 * @param {number} i 
 * @returns strign or null value
 */
const generateIdFromOther = (itemPosition,items,item,i) => {
    let cellIdToCheck
    if(((itemPosition + i) < 10) && ((itemPosition + i) > -1)){
        if(isNaN(item)){
            newId = '_p' + item + items[(itemPosition + i)]
        }else{
            newId = '_p' + items[(itemPosition + i)] + item
        }
        cellIdToCheck = getCellById(newId,actionZone__ships)
        if(!cellIdToCheck.classList.contains('disabled'))
            return newId
    }
    return null
}
/**
 * function to generate an array with id from sorrounding cell to cell which has cellId given as parameter
 * 
 * @param {string} cellId 
 * @returns array
 */
const generateSorroundedIds = (cellId) => {
    let newId
    let arrayAux = []
    //letter and number from cell id
    let letter = cellId.substring(2,3)
    let number = cellId.substring(3)
    //specific position in array of values for number and letter from cellId
    let numberIdPosition = numbers.indexOf(number)
    let letterIdPosition = letters.indexOf(letter)
    //for loop to insert values sorrounded cell by changind number
    for (let i = -1; i <= 1; i+=2) {
        
            newId = generateIdFromOther(numberIdPosition,numbers,letter,i)
            if(newId)
            arrayAux.push(newId)
            newId = generateIdFromOther(letterIdPosition,letters,number,i)
            if(newId)
            arrayAux.push(newId)

    }
    return arrayAux
}
/**
 * function to choose a postion from array given as paramere by randomly choosing
 * 
 * @param {Array} positions 
 * @returns 
 */
const getPosition = (positions) =>{
    let random = Math.floor(Math.random() * positions.length)
    let position = positions[random]
    positions.splice(random,1)
    if(positions.length == 0){
        sorrounded = true
    }
    return position
}

/**
 * function to emulate machine intelligence by calling other function
 */
const machineTurn = () => {
    let positionShoot
    if(shootOnTarget){
        sorrounded = false
        cellSorround  = generateSorroundedIds(lastShoot)
        positionShoot = getPosition(cellSorround)
    }else if(!sorrounded){
        positionShoot = getPosition(cellSorround)
    }else{
        positionShoot ='_p' + randomPosition()
    }
    shoot(false,positionShoot)
}

//events

infoZone__ships.addEventListener('click',shoot)

