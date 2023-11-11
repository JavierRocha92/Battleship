const stats__game = document.querySelectorAll('.td_stats')
// const stats__cpu = document.querySelectorAll('.td_cpu')
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
 * function t fill stats for table stats
 */
const fillTable = () => {
    let count = 0
    for (const key in stats) {
        console.log(key)
        Array.from(stats__game)[count].textContent = stats[key]
        count++
    }
}
const fillDate = () => {
    let finalDate = new Date()
    finalDate = (finalDate - dateBegin) / 1000

    td_time.textContent = finalDate
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

const checkScore = (winner) => {
    if(winner === 'machine' && stats.enemyShoots === 10){
        musicGame.pause()
        gameOver.play()
        end = true
        
    }else{
        if(stats.playerShootsOnTarget === 10){
            musicGame.pause()
            winnerSound.play()
            end = true
        }
    }
    if(end){
        fillStats(winner)
        showStats()
    }
}

footer_buton.addEventListener('click',() => {
    location.reload()
})