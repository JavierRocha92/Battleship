const infoZone__ships = document.getElementById('infoZone__ships')
const actionZone__ships = document.getElementById('actionZone__ships')


const createCell = (row,column) => {
    const cell = document.createElement('DIV')
    cell.style.gridArea = row+'/'+column
    // cell.style.border = '0.1px solid black'
    return cell
    
}

const loadCells = () => {
    fragment1 = document.createDocumentFragment()
    fragment2 = document.createDocumentFragment()

    for (let i = 0; i <= 10; i++) {
        for (let j = 0; j <= 10; j++) {
            fragment1.appendChild(createCell(i,j))
            fragment2.appendChild(createCell(i,j))
        }
    }
    infoZone__ships.appendChild(fragment1)
    actionZone__ships.appendChild(fragment2)
}






//EVENTS

document.addEventListener('DOMContentLoaded',loadCells)