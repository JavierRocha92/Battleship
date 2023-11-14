const section_butons = document.getElementById('section_butons')
const container = document.getElementById('container')
const footer = document.getElementById('footer')
//global variable to detect if vibratin efect is or not allowed
let vibration = false
/**
 * function to pause audios for specific button
 * 
 * @param {HTMLDivElement} div 
 */
const disconnect = (div) => {
    //conditional to deactivate vibration
    console.log('este es el id de elemento '+div.id)
    if(div.id == 'vibration__icon'){
        if(vibration)
        vibration = false
        else
        vibration = true
    }else{//condiitonale turn volumen off from audios
        const audios = document.querySelectorAll('.'+div.id)
        Array.from(audios).forEach(element => {
            if(element.volume == 0)
            element.volume = 1.0
            else
            element.volume = 0
        });
    
    }
}
/**
 * function to toggle hide classList for e (to put white bar over button form section_butons)
 * 
 * @param {event} event 
 */
const manageBar = (event) => {
    const e = event.target
    if (e.className === 'icon' ) {
        const element = e.nextElementSibling
        element.classList.toggle('hide')
        disconnect(e.parentElement)
    }
    if (e.classList.contains('red_bar')) {
        e.classList.toggle('hide')
        disconnect(e.parentElement)
    }
}

const showStats = () => {
    footer.classList.add('appearFooter')
}
/**
 * function to add classList to container for vibration efect
*/
const toVibrate = () => {
    container.classList.add('animation__container')
}
/**
 * function to remove classList to container for vibration efect
 */
const notVibrate = () => {
    container.classList.remove('animation__container')
}
/**
 * funciton to add style backgorund when pointer is over a selectinable cell
 * 
 * @param {event} event 
 */
const raiseCell = (event) => {
    const e = event.target
    if(e.classList.contains('cell') && !e.classList.contains('disabled')){
        e.style.backgroundColor = 'white'
    }
}
/**
 * funtion to remove backgorund style for a cell when pointer is out from it
 * 
 * @param {even} event 
 */
const hideCell = (event) => {
    const e = event.target
    if(e.classList.contains('cell'))
    e.style.backgroundColor = 'transparent'
}
infoZone__ships.addEventListener('mouseover',raiseCell)
infoZone__ships.addEventListener('mouseout',hideCell)
/**
 * function to genrate a animation with the text given as parameter by adding and removing classList to actionZOne__title
 * 
 * @param {string} text text to show
 */
const showTarget = (text) => {
    if(text.indexOf('_') != (-1))
    text = text.substring(2).toUpperCase()
actionZone__title.textContent = ''
    actionZone__title.classList.toggle('appearText')
    actionZone__title.classList.toggle('desappearText')
    //accion para que aparezca el turno del jugador que toque
    actionZone__title.textContent = text
    actionZone__title.classList.toggle('desappearText')
    actionZone__title.classList.toggle('appearText')
}
section_butons.addEventListener('click', manageBar)