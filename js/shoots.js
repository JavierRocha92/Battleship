//elements form DOM
// const infoZone__ships = document.getElementById('infoZone__ships')
// const actionZone__ships = document.getElementById('actionZone__ships')
const container = document.getElementById('container')
const shootSound = document.getElementById('shootSound')
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
const shootOn = () =>{
    shootSound.play()
}
/**
 * function to add classList to a cell dependig of its classList to generate 
 * an animation or other
 * 
 * @param {HTMLDivElement} cell 
 */
const generateAnimation = (cell,map) =>{
    setTimeout(shootOn,3300)
    const ball = cell.firstElementChild
    if(cellIdHasPoint(cell,map)){
        ball.classList.add('ballShootRed')
        if(cell.id.substring(1,2) === 'p'){
            shootOnTarget = true
            lastShoot = cell.id
            enemyShootsOnTarget++
        }else{
            playerShootsOnTarget++
        }
    }else{
        ball.classList.add('ballShootWhite')
        if(cell.id.substring(1,2) === 'p'){
            shootOnTarget = false
            enemyShoots++
        }else{
            playerShoots++
        }
    }
    ball.addEventListener('animationend',()=>{
        ball.classList.remove('ballEnemyOutside')
        if(cell.id.substring(1,2) === 'p'){
            turnPlayer = true
            checkScore('machine')
        }else{
            checkScore('player')
        }
    })

}
// container.addEventListener('animationend',()=>{
//     container.classList.remove('animation__container')
// })
const showTarget = (text,player = false) => {
    // actionZone__title.textContent = ''
    let firstText = actionZone__title.textContent
    actionZone__title.classList.remove('appearText')
    actionZone__title.classList.add('desappearText')
    actionZone__title.addEventListener('animationend',() =>{
        if(player)
        actionZone__title.textContent = 'YOUR TURN'
        else
        actionZone__title.textContent = 'ENEMY TURN'
        actionZone__title.classList.remove('desappearText')
        actionZone__title.classList.add('appearText')
        actionZone__title.addEventListener('animationend',() => {
            actionZone__title.classList.remove('appearText')
            actionZone__title.classList.add('desappearText')
            actionZone__title.addEventListener('animationend',() => {
                actionZone__title.textContent = text.substring(2).toUpperCase()
                actionZone__title.classList.remove('desappearText')
                actionZone__title.classList.add('appearText')
                actionZone__title.addEventListener('animationend',() =>{
                    actionZone__title.classList.add('desappearText')
                    
                })
            })

        })
    })
    // actionZone__title.classList.toggle('desappearText')
  

}




//4 si ninguna de las aneriores entonces genreamos un diapro aleatoio
