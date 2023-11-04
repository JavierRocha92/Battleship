//VARIABLES
//global variable to check if shoot hit a ship
let shootOnTarget = false
//global varibale to storage the last shot
let lastShoot
//global varibel to storage cell sorrounded the last shoot on target
let cellsSorround
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
let firstShootOnTarget = null

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
        //conditinal is event listener is a div for player turn
        if(e.tagName === 'DIV'){
            console.log('este es el valor de truno para player '+turnPlayer)
            if(turnPlayer){
                generateAnimation(e,PlayerShipsMap)
                turnPlayer = false
                e.addEventListener('animationend',machineTurn)
            }
        }
    }else{
        //machine turn
        Array.from(actionZone__ships.children).forEach((cell) => {
            if(cell.getAttribute('id') == cellId){
                generateAnimation(cell,EnemyShipsMap)
                cell.classList.add('disabled')
            }
        })
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
    for(const cell of Array.from(cells.children)){
        if(cell.id == cellId){
            return cell
        }
    }
}
/**
 * function to generate a random position to shoot while this postision is not choosen yet
 * 
 * @returns classList from specific cell
 */
const randomPosition = () => {
    let randomPosition = 0
    let cell
    let position
    //do while loop while cells randomluy chose has classList disabled
    do{
        randomPosition = Math.floor(Math.random() * positionBall.length)
        position = positionBall[randomPosition]
        cell = getCellByPosition(position)
    }while(cell.classList.contains('disabled'))

    return positionBall[randomPosition]
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
    //conditional to check if position is in array range
    if(((itemPosition + i) < 10) && ((itemPosition + i) > -1)){
        //conditional to check if item is not a number to change nubmer
        if(isNaN(item)){
            newId = '_p' + item + items[(itemPosition + i)]
        }else{//thid time genrate is by changing letter
            newId = '_p' + items[(itemPosition + i)] + item
        }
        //get the cell which has this new id
        cellIdToCheck = getCellById(newId,actionZone__ships)
        //conditinal to check if this cell has disabled classList or not
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
    //for loop to insert values sorrounded cell by changind number and letter
    for (let i = -1; i <= 1; i+=2) {
            //generate a new id by changin number
            newId = generateIdFromOther(numberIdPosition,numbers,letter,i)
            //if exists insert into arrayAux
            if(newId)
            arrayAux.push(newId)
            //generate a new id by changin letter
            newId = generateIdFromOther(letterIdPosition,letters,number,i)
            //if exists insert into arrayAux
            if(newId)
            arrayAux.push(newId)
    }
    return arrayAux
}
/**
 * function to choose a postion from array given as paramere by randomly choosing
 * 
 * @param {Array} positions 
 * @returns specific randomly position to shoot
 */
const getPosition = (positions) =>{
    let random = Math.floor(Math.random() * positions.length)
    //get a random id for shoot a cell
    let position = positions[random]
    //delete this id from array for no repeat selection
    positions.splice(random,1)
    //conditional to check if all sorrounind cells has been shot
    if(positions.length == 0){
        //this time sorrounde become true
        sorrounded = true
    }
    return position
}

/**
 * function to emulate machine intelligence by calling other function
 */
const machineTurn = () => {
    let positionShoot
    //conditinal to check if the last shoot hit a ship
    if(shootOnTarget){
        //onditional to check is the first time a ship is hit
        if(!firstShootOnTarget){
            console.log('entro por primera vez para la varibale first')
            firstShootOnTarget = lastShoot
        }
        //set false value to sorrounded
        sorrounded = false
        //get ids sorrounding cells 
        cellsSorround  = generateSorroundedIds(lastShoot)
        if(cellsSorround.length == 0){
            sorrounded = true
            positionShoot ='_p' + randomPosition()
        }else{
            //get a random id from array cellsSorround
            positionShoot = getPosition(cellsSorround)
        }
        //get a random id from array cellsSorround
        positionShoot = getPosition(cellsSorround)
    }else//                                                             0               1
    //conditional to check if a cell on a ship is sorrounded by shoot 0 1 0 --> false 1 1 1 --> true
        if(!sorrounded){//                                              0               1
            positionShoot = getPosition(cellsSorround)
        }else 
        //consitional to check if firstShootOnTarget has value or not
        if(firstShootOnTarget){
            firstShootOnTarget = null
            //set false value to sorrounded
            sorrounded = false
            //get ids sorrounding cells 
            cellsSorround  = generateSorroundedIds(firstShootOnTarget)

                if(cellsSorround.length == 0){
                    sorrounded = true
                    positionShoot ='_p' + randomPosition()
                }else{
                    //get a random id from array cellsSorround
                    positionShoot = getPosition(cellsSorround)
                }
            }else{
                positionShoot ='_p' + randomPosition()
            }
    //calling method to genreate a shoot to cell which id matches to parameter
    shoot(false,positionShoot)
}

//events

infoZone__ships.addEventListener('click',shoot)

