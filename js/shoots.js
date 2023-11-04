//elements form DOM
// const infoZone__ships = document.getElementById('infoZone__ships')
// const actionZone__ships = document.getElementById('actionZone__ships')
const container = document.getElementById('container')
//functions

const cellIdHasPoint = (cell,map) =>{
    for (const id of map) {
        if('.'+cell.id === id){
            return true
        }
    }
}
/**
 * function to add classList to a cell dependig of its classList to generate 
 * an animation or other
 * 
 * @param {HTMLDivElement} cell 
 */
const generateAnimation = (cell,map) =>{
    const ball = cell.firstElementChild
    if(cellIdHasPoint(cell,map)){
        ball.classList.add('ballShootRed')
        if(cell.id.substring(1,2) === 'p'){
            shootOnTarget = true
            lastShoot = cell.id
        }
    }else{
        ball.classList.add('ballShootWhite')
        if(cell.id.substring(1,2) === 'p')
            shootOnTarget = false
        }
    ball.addEventListener('animationend',()=>{
        ball.classList.remove('ballEnemyOutside')
    })
    
}


// container.addEventListener('animationend',()=>{
//     container.classList.remove('animation__container')
// })



