//VARIABLES
//global variable to determiante sirection from a ship
let direction = false
//global variabel to count the number of limit a ship can has
let counterLimit = 0
//global varibale to know if a ship was defeated or not
let shipIsSunken = false
//global variable to know what way the ship is taking
let way
//global variable to check if shoot hit a ship int he last shoot
let shootOnTarget = false
//gloabal varibale to check the secodn shoot on a shipsç
let secondShootOnTarget = false
//global varibale to detect a limit of a ships
let shipLimit = false
//global varibale to storage the last shot
let lastShoot
//global varibel to storage cell sorrounded the last shoot on target
let cellsSorround
//global variable to detect if shootOnTarget is sorrounded
let sorrounded = true
//global json to count how many shoot made each player
let stats = {
    enemyShoots: 0,
    playerShoots: 0,
    enemyShootsOnTarget: 0,
    playerShootsOnTarget: 0
};
//global boolean varibale to determinate end of the game
let end = false
//global variable for turn management
let turnPlayer = true
//golbal varable to storage first ship position for machine intelligence
let firstShootOnTarget = null
//audio tag with sound of the game action
const musicGame = document.getElementById('musicGame')
//button to begin teh game
const header__button = document.getElementById('header__button')
const header = document.getElementById('header')

//gloabal vairbales araay to storage letter and numbers corerponding to cell positions
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
/**
 * function to filter tagName of event.target to call or not function 
 * to generate an animation
 * 
 * @param {event} event 
 */
const shoot = (event = false, cellId) => {
    if (!end) {
        if (event) {
            const e = event.target
            //conditinal is event listener is a div for player turn
            if (e.tagName === 'DIV') {
                if (turnPlayer) {
                    showTarget(e.id)
                    generateAnimation(e, PlayerShipsMap)
                    turnPlayer = false
                    e.classList.add('disabled')
                    // e.addEventListener('animationend',machineTurn)
                }
            }
        } else {
            //machine turn
            Array.from(actionZone__ships.children).forEach((cell) => {
                if (cell.getAttribute('id') == cellId) {
                    showTarget(cellId)
                    generateAnimation(cell, EnemyShipsMap)
                    cell.classList.add('disabled')
                }
            })
        }
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
        if (element.classList.contains('p' + position))
            return element
    }
}
/**
 * function to get a specific cells by id given as parameter
 * 
 * @param {string} cellId 
 * @param {HTMLAllCollection} cells 
 */
const getCellById = (cellId, cells) => {
    for (const cell of Array.from(cells.children)) {
        if (cell.id == cellId) {
            return cell
        }
    }
    return null
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
    do {
        randomPosition = Math.floor(Math.random() * positionBall.length)
        position = positionBall[randomPosition]
        cell = getCellByPosition(position)
    } while (cell.classList.contains('disabled'))

    return '_p' + (positionBall[randomPosition])
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
const generateIdFromOther = (itemPosition, items, item, i) => {
    let cellIdToCheck
    //conditional to check if position is in array range
    if (((itemPosition + i) < 10) && ((itemPosition + i) > -1)) {
        //conditional to check if item is not a number to change nubmer
        if (isNaN(item)) {
            newId = '_p' + item + items[(itemPosition + i)]
        } else {//thid time genrate is by changing letter
            newId = '_p' + items[(itemPosition + i)] + item
        }
        //get the cell which has this new id
        cellIdToCheck = getCellById(newId, actionZone__ships)
        //conditinal to check if this cell has disabled classList or not
        if (!cellIdToCheck.classList.contains('disabled'))
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
    let letter = cellId.substring(2, 3)
    let number = cellId.substring(3)
    //specific position in array of values for number and letter from cellId
    let numberIdPosition = numbers.indexOf(number)
    let letterIdPosition = letters.indexOf(letter)
    //for loop to insert values sorrounded cell by changind number and letter
    for (let i = -1; i <= 1; i += 2) {
        //generate a new id by changin number
        newId = generateIdFromOther(numberIdPosition, numbers, letter, i)
        //if exists insert into arrayAux
        if (newId)
            arrayAux.push(newId)
        //generate a new id by changin letter
        newId = generateIdFromOther(letterIdPosition, letters, number, i)
        //if exists insert into arrayAux
        if (newId)
            arrayAux.push(newId)
    }
    return arrayAux
}
/**
 * 
 * @param {string} clas classList parameter to show depemding 
 * @returns id form the first matching cell
 */
const getCellByClassList = (clas) => {
    for (const cell of Array.from(actionZone__ships.children)) {
        if (cell.classList.contains(clas))
            return cell.id
    }
    return null
}
/**
 * function to choose a postion from array given as paramere by randomly choosing
 * 
 * @param {Array} positions 
 * @returns specific randomly position to shoot
 */
const getPosition = (positions) => {
    let random = Math.floor(Math.random() * positions.length)
    //get a random id for shoot a cell
    let position = positions[random]
    //delete this id from array for no repeat selection
    positions.splice(random, 1)
    //conditional to check if all sorrounind cells has been shot
    if (positions.length == 0) {
        //this time sorrounde become true
        sorrounded = true
    }
    return position
}
/**
 * function to detect if there is a available position in array ids given as parameter
 * 
 * @param {Array} ids array of string id from cells 
 * @returns true if there is a availble position or flase it is not
 */
const checkSorround = (ids) => {
    let cell
    let ball
    for (const id of ids) {
        cell = getCellById(id, actionZone__ships)
        ball = cell.firstElementChild
        if (!ball.classList.contains('ballShootWhite')) {
            return true
        }
    }
    return false
}
/**
 * fucntion to detect which direction the ship is taking on board
 * 
 * @returns string (direction which ship take)
 */
const getDirection = () => {
    if (firstShootOnTarget.substring(0, 3) == lastShoot.substring(0, 3))
        return 'vertical'
    else
        return 'horizontal'
}
/**
 * function to return a cell to shoot depending of the direction the ship is taking
 * 
 * @param {string} way direction the ship is taking
 * @param {Array} cellsArray posibles cell to shot
 * @returns null or poisiton
 */
const getPositionByDirection = (way, cellsArray) => {
    console.log('esto es lo que vale limite '+shipLimit)
    console.log('entro para coger por direccion '+way)
    console.log('estos son los ids '+cellsArray)
    let item
    if (way == 'vertical') {
        if(shipLimit)
        item = firstShootOnTarget.substring(0, 3)
        else
        item = lastShoot.substring(0, 3)
    } else {
        if(shipLimit)
        item = firstShootOnTarget.substring(3)
        else
        item = lastShoot.substring(3)
    }
    //loop for to find risgth position by way specified
    console.log('este es el item '+item)
    for (const cell of cellsArray) {
        if (way == 'vertical') {
            if (cell.substring(0, 3) == item)
                return cell
        } else {
            if (cell.substring(3) == item)
                return cell
        }
    }
    return null
}
/**
 * function to set all values to default when a ship is sunken
 */
const setValues = () =>{
    shipLimit = false
    firstShootOnTarget = false
    secondShootOnTarget = null
    shootOnTarget = false
    lastShoot = null
    cellsSorround = []
    sorrounded = false
}

/**
 * funciton to simulate machine intelligence by calling another functions
 */
const machineTurn = () =>{
    //genero una posicion aleatoria al entrar 
    let positionShoot = randomPosition()
    //pregunto si he pegado a un barco en la ultima tirada
    if(shootOnTarget){
        cellsSorround = generateSorroundedIds(lastShoot)
        // positionShoot = getPosition(cellsSorround)
        //si he pegado pregunto si ya habia pegado antes
        if(!firstShootOnTarget){
            //si no existe la primera vez la creo 
            firstShootOnTarget = lastShoot
            positionShoot = getPosition(cellsSorround)
        }else{
            //si ya existe pregunto si existe la segunda vez que he dado a un barco
            if(!secondShootOnTarget){
                secondShootOnTarget = true
                direction = getDirection()
                positionShoot = getPositionByDirection(direction,cellsSorround)
            }else{
                positionShoot = getPositionByDirection(direction,cellsSorround)
            }
        }

    }else{
        //cuando hemos dado la ultima vez en blanco
        //preguntamos si estramos y hemos dado ya a un barco, que seria la situacion
        //de que estamos buscanso la direccion de este
        if(!firstShootOnTarget){
            positionShoot = randomPosition()
        }else{
            //le pregunto si existe segunda posicionl eso significa que he encontrado un limite
            if(secondShootOnTarget){
                shipLimit = true
                cellsSorround = generateSorroundedIds(firstShootOnTarget)
                positionShoot = getPositionByDirection(direction,cellsSorround)
            }else{
                //aqui entro porue estoy buscansola direecion del barco
                positionShoot = getPosition(cellsSorround)
            }
        }

    }
    //pregunto si despues de todos los casoso no hay posicion para tirar 
    if(positionShoot == null){
        //sabiendo que no hay posicin le pregunto si hemos encontrado un limite
        if(shipLimit){
            setValues()
            //no hay posicion disponible y ya tenemos limmite, quiere decir wue tenemos
            //los dos limites del barco asique tiro random
            positionShoot = randomPosition()
        }else{
            shipLimit = true
            cellsSorround = generateSorroundedIds(firstShootOnTarget)
            positionShoot = getPositionByDirection(direction,cellsSorround)
            //le pregunto otra vez si es nula porque puede que encuentre los dos limites 
            //buscando la tirada
            if(positionShoot == null){
                positionShoot = randomPosition()
                setValues()
            }
        }
    }
    shoot(false,positionShoot)
}


/**
 * function  to simulate the game start by showing player turn
 */
const startGame = () => {
    // showTarget(false,'START BATTLE')
    showTarget('YOUR TURN')

}
/**
 * function to manage click over header and show boarda game and play theme
 */
const openGame = () => {
    header__button.classList.add('selected')
    header.classList.add('hideHeader')
    document.addEventListener('animationend', () => {
        container.classList.remove('hide')
        container.classList.add('appearContainer')
        startGame()
        musicGame.play()
    })
}
// //events
infoZone__ships.addEventListener('click', shoot)

header__button.addEventListener('click', openGame)




