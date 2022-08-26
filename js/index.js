const $start = document.getElementById('start')
const $gameBoard = document.getElementsByClassName('gameboard')[0]
const model = {
    boxes: []
}
$start.addEventListener('click', () => {
    $start.style.display = 'none'
    launch()
})

function onPageLoad() {
    $gameBoard.style.width = settings.dimensions.width * settings.dimensions.unit + 'px'
    $gameBoard.style.height = settings.dimensions.height * settings.dimensions.unit + 'px'
}

function launch() { 
    initModel()
    initDom()
}

function initModel() {
    const rows = settings.dimensions.height
    const cols = settings.dimensions.width
    let id = 0
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let box = {
                id: id,
                x: i,
                y: j,
                color: null
            }
            model.boxes.push(box)
            id++
        }
    }
}

function initDom() {
    const rows = settings.dimensions.height
    const cols = settings.dimensions.width
    for(let i = 0; i < cols; i++) {
        const $row = document.createElement('div')
        for(let j = 0; j < rows; j++) {
            const $box = document.createElement('div')
            $box.classList.add('box-main')
            $box.style.height = settings.dimensions.unit + 'px'
            $box.style.width = settings.dimensions.unit + 'px'
            $row.appendChild($box)
        }
        $gameBoard.appendChild($row)
    }
}

onPageLoad()