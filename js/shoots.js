//elements form DOM
// const infoZone__ships = document.getElementById('infoZone__ships')
// const actionZone__ships = document.getElementById('actionZone__ships')
const container = document.getElementById('container')
//functions

/**
 * function to add classList to a cell dependig of its classList to generate 
 * an animation or other
 * 
 * @param {HTMLDivElement} cell 
 */
const generateAnimation = (cell) =>{
    const ball = cell.firstElementChild
    if(cell.classList.contains('shipOnIt')){
        ball.classList.add('ballShootRed')
    }else{
        ball.classList.add('ballShootWhite')
    }
    ball.addEventListener('animationend',()=>{
        ball.classList.remove('ballEnemyOutside')
    })
    
}


// container.addEventListener('animationend',()=>{
//     container.classList.remove('animation__container')
// })



