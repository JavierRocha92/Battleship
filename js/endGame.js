const stats__game = document.querySelectorAll('.td_stats')
const footer__title = document.getElementById('footer__title')
const footer_buton = document.getElementById('footer_buton')
const td_time = document.getElementById('td_time')

/**
 * function to show the winner from the batle in stats
 * 
 * @param {string} winner 
 */
const fillTitle = (winner) =>{
    if(winner === 'player'){
        footer__title.textContent = 'WINNER'
        footer__title.style.background = 'green'
    }
    else{
        footer__title.textContent = 'LOOSER'
        footer__title.style.background = 'red'
    }
}
/**
 * function to create a range time from a miliseconds value given as paremeter
 * 
 * @param {number} miliseconds 
 * @returns string (format date)
 */
function getTime(miliseconds) {
    let minutes = Math.floor(miliseconds / 60000)
    let seconds = ((miliseconds % 60000) / 1000).toFixed(0)
    if(seconds < 10 )
    seconds = '0'+seconds
    if(minutes < 10 )
    minutes = '0'+minutes
    return minutes + " minutos y " + seconds + " segundos";
  }
  
/**
 * function t fill stats for table stats
 */
const fillTable = () => {
    let count = 0
    for (const key in stats) {
        Array.from(stats__game)[count].textContent = stats[key]
        count++
    }
}
/**
 * function to fill 
 */
const fillDate = () => {
    let finalDate = new Date()
    finalDate = (finalDate - dateBegin)
    td_time.textContent = getTime(finalDate)
}
/**
 * fucntion to fill diferents part from stats final show game
 * 
 * @param {string} winner 
 */
const fillStats = (winner) => {
    fillTitle(winner)
    fillTable()
    fillDate()
}
/**
 * function to show ships position when the game ends
 */
const showShipsCells = () => {
    
    for (let i = 0; i < Array.from(infoZone__ships.children).length; i++) {
        const element = Array.from(infoZone__ships.children)[i]
        if(element.id === PlayerShipsMap[i].substring(1)){
            element.style.backgroundColor = 'red'
        }
        
    }
}
/**
 * function to check if all ships ar sunken to end game and show final stats
 * 
 * @param {string} winner name from the winner
 */
const checkScore = (winner) => {
    if(winner === 'machine' && stats.enemyShootsOnTarget === 17){
        gameOver.play()
        end = true
    }else{
        if(stats.playerShootsOnTarget === 17){
            winnerSound.play()
            end = true
        }
    }
    if(end){
        showShipsCells()
        musicGame.volume = 0
        fillStats(winner)
        showStats()
    }
}

footer_buton.addEventListener('click',() => {
    location.reload()
})