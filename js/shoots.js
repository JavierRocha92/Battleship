//elements form DOM*******************************************************************************************

const shootSound = document.getElementById('shootSound')
const shootWater = document.getElementById('shootWater')
const gameOver = document.getElementById('gameOver')
const winnerSound = document.getElementById('winner')
const actionZone__title = document.getElementById('actionZone__title')

//FUNCTIONS*****************************************************************************************************
/**
 * function to get a cell which id contains a point for example --> (._pa5)
 * 
 * @param {HTMLDivElement} cell 
 * @param {HTMLAllCollection} map 
 * @returns 
 */
const cellIdHasPoint = (cell,map) =>{
    for (const id of map) {
        if('.'+cell.id === id){
            return true
        }
    }
}
/**
 * function to create an efect by playing bobm sound and generate erathquake by valling function toVibrate()
 */
const shootOnFire = () =>{
    shootSound.play()
    if(!vibration)
    toVibrate()
}
/**
 * fucntion to generate water sound when ball is not on target
 */
const shootOnWater = () =>{
    shootWater.play()
}
/**
 * function to add classList to a cell dependig of its classList to generate 
 * an animation or other
 * 
 * @param {HTMLDivElement} cell 
 */
const generateAnimation = (cell,map) =>{
    //removing classList to container 
    notVibrate()
    const ball = cell.firstElementChild
    if(cellIdHasPoint(cell,map)){
        setTimeout(shootOnFire,3300)
        ball.classList.add('ballShootRed')
        //count stats and machine turn
        if(cell.id.substring(1,2) === 'p'){
            //true value when a ship has been hit
            shootOnTarget = true
            //storage the last hit position
            lastShoot = cell.id
            stats.enemyShootsOnTarget++
            stats.enemyShoots++
            //player turn
        }else{
            stats.playerShootsOnTarget++
            stats.playerShoots++
        }
    }else{
        setTimeout(shootOnWater,3300)
        ball.classList.add('ballShootWhite')
        //count stats
        if(cell.id.substring(1,2) === 'p'){
            // the last hit is not on a ship
            shootOnTarget = false
            stats.enemyShoots++
        }else{
            stats.playerShoots++
        }
    }
    //whena animation ball is ended
    ball.addEventListener('animationend',()=>{
        ball.classList.remove('ballEnemyOutside')
        //calling funtion to show a new turn depending of ball id
        if(cell.id.substring(1,2) === 'p'){
            //let player make his shoot
            turnPlayer = true
            console.log('entro en la funcion de machine')
            showTarget('YOUR TURN')
            checkScore('machine')
        }else{
            console.log('entro en la funcion de player')
            showTarget('ENEMY TURN')
            checkScore('player')
            setTimeout(machineTurn,1000)
        }
    })

}

