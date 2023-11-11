//elements form DOM
// const infoZone__ships = document.getElementById('infoZone__ships')
// const actionZone__ships = document.getElementById('actionZone__ships')

const shootSound = document.getElementById('shootSound')
const shootWater = document.getElementById('shootWater')
const gameOver = document.getElementById('gameOver')
const winnerSound = document.getElementById('winner')
const actionZone__title = document.getElementById('actionZone__title')
//functions

const cellIdHasPoint = (cell,map) =>{
    // console.log('este es el id de la celda que me manda '+cell.id)
    for (const id of map) {
        // console.log('ide de array '+id)
        if('.'+cell.id === id){
            // console.log('entro en el if')
            return true
        }
    }
}
const shootOnFire = () =>{
    shootSound.play()
    toVibrate()
}
const shootOnWater = () =>{
    shootWater.play()
}
// const showBall = (ball) => {
//     ball.classList.remove('hide')
// }
/**
 * function to add classList to a cell dependig of its classList to generate 
 * an animation or other
 * 
 * @param {HTMLDivElement} cell 
 */
const generateAnimation = (cell,map) =>{
    notVibrate()
    const ball = cell.firstElementChild
    if(cellIdHasPoint(cell,map)){
        setTimeout(shootOnFire,3300)
        ball.classList.add('ballShootRed')
        // setTimeout(() => {
        //     showBall(ball)
        // },800)
        if(cell.id.substring(1,2) === 'p'){
            shootOnTarget = true
            lastShoot = cell.id
            stats.enemyShootsOnTarget++
            stats.enemyShoots++
        }else{
            stats.playerShootsOnTarget++
            stats.playerShoots++
        }
    }else{
        setTimeout(shootOnWater,3300)
        ball.classList.add('ballShootWhite')
        // setTimeout(() => {
        //     showBall(ball)
        // },800)
        if(cell.id.substring(1,2) === 'p'){
            shootOnTarget = false
            stats.enemyShoots++
        }else{
            stats.playerShoots++
        }
    }
    ball.addEventListener('animationend',()=>{
        ball.classList.remove('ballEnemyOutside')
        let id = cell.getAttribute('id')
        if(cell.id.substring(1,2) === 'p'){
            turnPlayer = true
            showTarget('YOUR TURN')
            checkScore('machine')
        }else{
            showTarget('ENEMY TURN')
            checkScore('player')
            setTimeout(machineTurn,1000)
        }
    })

}
// container.addEventListener('animationend',()=>{
//     container.classList.remove('animation__container')
// })





//4 si ninguna de las aneriores entonces genreamos un diapro aleatoio
