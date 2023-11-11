const section_butons = document.getElementById('section_butons')
const container = document.getElementById('container')
const footer = document.getElementById('footer')
/**
 * function to pause audios for specific button
 * 
 * @param {HTMLDivElement} div 
 */
const disconnect = (div) => {
    // let sibling = div.previousElementSibling
    // while(sibling){
    //     sibling.pause()
    //     if(sibling.previousElementSibling)
    //         sibling = sibling.previousElementSibling
    //     else
    //     sibling = null
    // }
   
}
/**
 * function to toggle hide classList for e (to put white bar over button form section_butons)
 * 
 * @param {event} event 
 */
const manageBar = (event) => {
    const e = event.target
    console.log('entro en  la funcion ' + e.className)
    if (e.className === 'icon') {
        const element = e.nextElementSibling
        element.classList.toggle('hide')
        disconnect(e.parentElement)
    }
    if (e.className === 'red_bar') {
        e.classList.toggle('hide')
        disconnect(e.parentElement)
    }
}

const showStats = () => {
    console.log('entro en la funcion del footer')
    console.log('este es el footer cuando entro '+footer.classList)
    footer.classList.add('appearFooter')
    console.log('este es el footer cuando salgo '+footer.classList)
}

const toVibrate = () => {
    container.classList.add('animation__container')
}
const notVibrate = () => {
    container.classList.remove('animation__container')
}
const raiseCell = (event) => {
    const e = event.target
    if(e.classList.contains('cell') && !e.classList.contains('disabled')){
        e.style.backgroundColor = 'white'
        console.log(e.style)
    }
}
const hideCell = (event) => {
    const e = event.target
    if(e.classList.contains('cell'))
    e.style.backgroundColor = 'transparent'
}
infoZone__ships.addEventListener('mouseover',raiseCell)
infoZone__ships.addEventListener('mouseout',hideCell)

const showTarget = (text) => {
    if(text.indexOf('_') != (-1))
    text = text.substring(2).toUpperCase()
    actionZone__title.classList.toggle('appearText')
    actionZone__title.classList.toggle('desappearText')
    //accion para que aparezca el turno del jugador que toque
    actionZone__title.textContent = text
    actionZone__title.classList.toggle('desappearText')
    actionZone__title.classList.toggle('appearText')
}
section_butons.addEventListener('click', manageBar)