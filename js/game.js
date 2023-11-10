//VARIABLES
//global variabel to count the number of limit a ship can has
let counterLimit = 0
//global varibale to know if a ship was defeated or not
let shipIsSunken = false
//global variable to know what way the ship is taking
let way
//global variable to check if shoot hit a ship int he last shoot
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
//audio tag with sound of the game action
const musicGame = document.getElementById('musicGame')

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
    if (event) {
        const e = event.target
        //conditinal is event listener is a div for player turn
        if (e.tagName === 'DIV') {
            if (turnPlayer) {
                showTarget(e.id,true)
                console.log(' es turno de la maquina')
                generateAnimation(e, PlayerShipsMap)
                turnPlayer = false
                e.addEventListener('animationend', machineTurn)
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
const getCellByClassList = (clas) =>{
    for (const cell of Array.from(actionZone__ships.children)) {
        if(cell.classList.contains(clas))
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
const checkSorround = (ids) =>{
    let cell
    let ball
    for (const id of ids) {
        cell = getCellById(id,actionZone__ships)
        ball = cell.firstElementChild
        if(!ball.classList.contains('ballShootWhite')){
            return true
        }
    }
    return false
}
/**
 * function to emulate machine intelligence by calling other function
 */
const machineTurn = () => {
    let positionShoot
    //conditinal to check if the last shoot hit a ship
    if (shootOnTarget) {
        //onditional to check is the first time a ship is hit
        if (!firstShootOnTarget) {
            firstShootOnTarget = lastShoot
        }
        //set false value to sorrounded
        sorrounded = false
        //get ids sorrounding cells 
        cellsSorround = generateSorroundedIds(lastShoot)
        if (cellsSorround.length == 0) {
            sorrounded = true
            positionShoot = randomPosition()
        } else {
            //get a random id from array cellsSorround
            positionShoot = getPosition(cellsSorround)
        }
    } else {//                                                              0               1
        //conditional to check if a cell on a ship is sorrounded by shoot 0 1 0 --> false 1 1 1 --> true
        //                                                                  0               1
        if (!sorrounded) {
            positionShoot = getPosition(cellsSorround)
        } else {
            //consitional to check if firstShootOnTarget has value or not
            if (firstShootOnTarget) {
                //set false value to sorrounded
                sorrounded = false
                //get ids sorrounding cells 
                cellsSorround = generateSorroundedIds(firstShootOnTarget)
                //set null value to first posiiton 
                firstShootOnTarget = null

                if (cellsSorround.length == 0) {
                    sorrounded = true
                    positionShoot = randomPosition()
                } else {
                    //get a random id from array cellsSorround
                    positionShoot = getPosition(cellsSorround)
                }
            } else {
                do{
                    positionShoot = randomPosition()
                    console.log('esta es la posicion aleatoria '+positionShoot)
                }while(!checkSorround(generateSorroundedIds(positionShoot)))
            }
        }
    }
    //calling method to genreate a shoot to cell which id matches to parameter
    shoot(false, positionShoot)
    
}
const isNotBallLimit = (ball) => {
    return ball.classList.contains('ballShootWhite')
}
const generateShootByPosition = (position,way) => {
    let newId
    if(way === 'vertical'){
        if(counterLimit == 0)
        newId = '_p' + position.substring(2,3) + parseInt(position.substring(3) + 1)
        else
        newId = '_p' + position.substring(2,3) + parseInt(position.substring(3) - 1)
    }
    if(way === 'horizontal'){
        let letter = position.substring(2,3)
        let letterPosition = letters.indexOf(letter)
        let newLetter
        if(counterLimit == 0)
        newLetter = letters[(letterPosition + 1)]
        else
        newLetter = letters[(letterPosition - 1)]

        newId = '_p' + newLetter + position.substring(3)
    }
    //generamos una celda respecto al id que le pasamos
    cell = getCellById(newId,actionZone__ships)
    //miramos si existe para si no devolver false porque indicaria que es un limite
    if(cell){
        //generamos el hijo de dicha celda si esta existe
        ball = cell.firstElementChild
        //miramos si esta bola tiene la clase de bola blanca para indicar tambien que es un limite
        if(isNotBallLimit(ball)){
            //si no lo es de ninguna de las dos manera devolvemos el id para que tire enn esa celda
            return newId
        }
    }
    //aqui deovlemos falso para que ponga el limite e atrue y purebe con el otro  limite
    return false
}
const getWay = (lastShoot,firstShootOnTarget) => {
    console.log('este es para dar la direccion ')
    console.log('este es el ultimo diaparo '+lastShoot)
    console.log('este es el primero '+firstShootOnTarget)
    if(lastShoot.substring(3) === firstShootOnTarget.substring(3))
        return 'horizontal'
    else
        return 'vertical'
}
const setValues = () => {
    firstShootOnTarget = null
    lastShoot = null
    counterLimit = 0
    cellsSorround = []
    way = null
}
// const machineTurn = () => {
//     let positionShoot
//     //primero genero una posciion aleatoria 
//     //ahora miro si la ultima vex que tire di a un barco 
//     if(shootOnTarget){
//         let cellsSorround = generateSorroundedIds(lastShoot)
//         //aqui miro si esta inicializada la primero posicion que le dimos a un barco
//         if(!firstShootOnTarget){
//             firstShootOnTarget = lastShoot
//             //si la primera posicion si que existe y la direccion aun no  vamos a determinar cual es la direccion 
//         }else{
//             //si la direccion no existe la creo
//             if(!way){
//                 way = getWay(lastShoot,firstShootOnTarget)
//             }
            
//         }
//         if(way){
//             //aqui llamos a edte metodo para que me devulve un id odne tirar la bola, si este es falso pongo el primer limite a false y pruebo cone l otro k¡limite
//             //si los dos limitees son false doy el barco por hundido y reseteo todos los valores
//             do{
//                 positionShoot = generateShootByPosition(lastShoot,way)
//                 if(counterLimit == 1){
//                     positionShoot = generateShootByPosition(firstShootOnTarget,way)
//                 }
//                 if(!positionShoot){
//                     counterLimit++
//                 }
//             }while(counterLimit < 2 && !positionShoot)
//             if(counterLimit == 2){
//                 //si el contador es igual a dos pongo todos los valores como al inicio porque he hundido el barcp
//                 setValues()
//             }
//             //aqui miro si la varibale tiene valor despues de aver pasado por todos los sitios y si no tiene genero un paosicion al azar
//         }
//         if(!positionShoot)
//         positionShoot = getPosition(cellsSorround)
//         //genero un a rray con las posicion de alrrededro pasandole como parametro la ultima posicion
        
//     }else{
//         //aqui entro cuando en la ultimavez no he dado a un barco entonces sigo tirando con el array mediante una posicion aleatoria
//         if(cellsSorround){
//             if(cellsSorround.lenght != 0){
//                 positionShoot = getPosition(cellsSorround)
//             }
//         }
//     }
//     if(!positionShoot){
//         positionShoot = randomPosition()
//     }
//     shoot(false,positionShoot)
// }


// //events

infoZone__ships.addEventListener('click', shoot)
document.addEventListener('DOMContentLoaded',() => {
    musicGame.play()
})


