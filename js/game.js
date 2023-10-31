//VARIABLES
//global variables to count how many shoot made each player
let enemyShoots = 0
let enemyShootsOnTarget = 0
let playerShoots = 0
let playerShootsOnTarget = 0
//global variable for turn management
let turnPlayer = true
//global variable to storage cell on shoot
const getCellByClass = (cellClass) => {
    return Array.from(actionZone__ships.children).filter((cell) => cell.classList.contains(cellClass))
}
/**
 * function to filter tagName of event.target to call or not function 
 * to generate an animation
 * 
 * @param {event} event 
 */
const shoot = (event = false, cellClass) => {
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
            if(cell.classList.contains(cellClass))
            generateAnimation(cell)
        })
        turnPlayer = true
    }
}
const randomPosition = () => {
    return postionBall[Math.floor(Math.random() * postionBall.length)]
}
const detectShip = () => {
    for (const cell of Array.from(actionZone__ships.children)) {
        if(cell.classList.contains('cell')){
            const son = cell.firstElementChild
            if(son.classList.contains('ballShootWhite')){
                return cell.id.substring(1)
            }
        }
    }
    return null
}
// const setPosition = (position) => {
//     const letter = ['a','b','c','d','e','f','g','h','i','j']

// }
const machineTurn = () => {
    // let positionShoot = detectShip()
    // if(positionShoot){
    //     // setPosition(positionShoot)
    // }else{
        positionShoot = randomPosition()
    // }
    shoot(false,'p'+positionShoot)
}

//events

infoZone__ships.addEventListener('click',shoot)

