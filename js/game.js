//VARIABLES

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
const numbers = [1,2,3,4,5,6,7,8,9,10]
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
                generateAnimation(e)
                turnPlayer = false
                e.addEventListener('animationend',machineTurn)
            }
        }
    }else{
        Array.from(actionZone__ships.children).forEach((cell) => {
            if(cell.getAttribute('id') == cellId){
                generateAnimation(cell)
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
    console.log('entro en la funcion de id')
    for(const cell of Array.from(cells)){
        if(cell.id == cellId){
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
const changeId = (itemToChoose,cellId) => {
    let positionItem
    let randomPos 
    let auxArray
    let newId
    console.log('este es el elemento que voy a cmabiar '+itemToChoose)
    if(isNaN(itemToChoose)){
        auxArray = [...letters]
        console.log('cambio la letra')
    }else{
        auxArray = [...numbers]
        console.log('cambio el numero')
    }
    positionItem = auxArray.indexOf(itemToChoose)
    console.log('esta es la poscion del item dentro del array '+positionItem)
    do{

        do{
            randomPos = Math.floor(Math.random() * 2 - 1)
        }while((positionItem == 0 && randomPos == -1) || (positionItem == 9 && randomPos == 1))
        console.log('esta es la posicion del nuevo elemento '+(positionItem + randomPos))
        // console.log(' esta es la posicion de la letra '+positionItem)
        // console.log(' este es el numero aleatorio '+randomPos)
        // console.log('esta es la nueva letra que se escoge al azar '+letters[(positionItem + randomPos)])
        if(isNaN(itemToChoose)){
            newId = '_p' + letters[(positionItem + randomPos)] + cellId.substring(3)
        }else{
            newId = '_p' + cellId.substring(2,3) + numbers[(positionItem + randomPos)]
        }
    }while(cellId == newId)
    console.log('este es el id que le paso por parametro '+cellId)
    console.log('este es el nuevo id que genero a cambiar un parametro del original '+newId)
    return newId
}
/**
 * function to choose waht element form id change for next shoot to shoot every posibilities the ship is around the flame
 * 
 * @param {string} position id from cell with a flame on it
 * @returns number or letter from this id dpending of random choice
*/
const chooseIdRandom = (position) =>{
    //get a random number to choose between 2 option by randomly choice
    random = Math.floor(Math.random() * 1)
    //conditional to return only letter
    if(random == 0){
        return position.substring(2,3)
    }
    //conditional to return only number
    else{
        return position.substring(3)
    }
}
const setPosition = (cellId) => {
    //declare varible to storage target cell in it to compare later
    let cellTarget
    let newId
    if(!firstPosition){
        firstPosition = cellId 
    }
    do{
        newId = changeId(chooseIdRandom(cellId),cellId)
        console.log('este es el id nuevo cambiando uno de los parametros '+newId)
        cellTarget = getCellById(newId,actionZone__ships.children)
        console.log('esta es la celda objetivo '+cellTarget.id)
        console.log('esta son las clases de la celdd objetivo '+cellTarget.classList)
    }while(cellTarget.classList.contains('disabled'))
    return cellTarget.id
}
/**
 * function to emulate machine intelligence by calling other function
 */
const machineTurn = () => {
    //calling method to get id from cell with a flame on it
    let positionShoot = detectShip()
    console.log('esta es la celda donde se ha detectado un barco '+positionShoot)
    //callig method setPosition() if positionShip return something
    if(positionShoot != null){
        //calling fucntion to choose a position where a ship may be in, around the flame
        positionShoot = setPosition(positionShoot)
        console.log('esta es la celda donde quiero disparar alrrededor del barco '+positionShoot)
    }else{
        //calling method to get a random positoin if there are not shootable ships in board 
        positionShoot ='_p' + randomPosition()
    }
    shoot(false,positionShoot)
}

//events

infoZone__ships.addEventListener('click',shoot)

