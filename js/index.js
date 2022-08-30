const $start = document.getElementById('start')
const $gameBoard = document.getElementsByClassName('gameboard')[0]
const model = {
    boxes: [],
    currentPiece: {
        coors: []
    }
}
$start.addEventListener('click', () => {
    if(settings.dimensions.width < 5 || settings.dimensions.height < 7) {
        console.error('invalid gameboard dimensions')
        return
    }
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
    spawnNewPeice()
    //begin anmation function which draws so dont draw here
    draw()
}

function initModel() {
    const cols = settings.dimensions.width
    const rows = settings.dimensions.height
    let id = 0
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
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
    const cols = settings.dimensions.width
    const rows = settings.dimensions.height
    for(let i = 0; i < cols; i++) {
        const $col = document.createElement('div')
        $col.classList.add('col')
        for(let j = 0; j < rows; j++) {
            const $box = document.createElement('div')
            $box.classList.add('box-main')
            $box.style.height = settings.dimensions.unit + 'px'
            $box.style.width = settings.dimensions.unit + 'px'
            $col.appendChild($box)
        }
        $gameBoard.appendChild($col)
    }
}

function getDomBox(box) {
    return document.getElementsByClassName('col')[box.x].children[box.y]
}

function draw() {
    model.boxes.forEach(box => {
        if(box.color) {
            getDomBox(box).style.background = box.color
        }
    })
}



function spawnNewPeice() {
    // if(cant spawn bc pieces in the way) {
    //     gameover()
    // })
    const randomPiece = pieces[Math.floor(Math.random() * (1 + 3))]
    randomPiece.forEach(coorPair => {
        console.log(coorPair)
        model.boxes.forEach(box => {
            if(coorPair.x == box.x && coorPair.y == box.y) {
                box.color = 'blue'
            }
        })
    })
}

onPageLoad()