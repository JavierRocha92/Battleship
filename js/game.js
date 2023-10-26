//elements form DOM
// const infoZone__ships = document.getElementById('infoZone__ships')
// const actionZone__ships = document.getElementById('actionZone__ships')

//functions


const genrateAnimation = (cell) =>{
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
const shoot = (event) => {
    const e = event.target
    if(e.tagName === 'DIV'){
        genrateAnimation(e)
    }
}

//events

infoZone__ships.addEventListener('click',shoot)





