const footer = document.getElementById('footer')


const manageBar = (event) => {
    const e = event.target
    console.log('entro en  la funcion '+e.className)
    if(e.className === 'icon' ){
        const element = e.nextElementSibling
        element.classList.toggle('hide')
    }
    if(e.className === 'red_bar' ){
        e.classList.toggle('hide')
    }
}



footer.addEventListener('click',manageBar)