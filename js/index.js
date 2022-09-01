const model = {
    boxes: [],
    currentPiece: {
        type: null,
        coors: [],
        prevCoors: [],
    }
}
$start.addEventListener('click', () => {
    if(settings.dimensions.width < 5 || settings.dimensions.height < 7) {
        return console.error('invalid gameboard dimensions')
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
    applyGravityToPiece()
}

function initModel() {
    const cols = settings.dimensions.width
    const rows = settings.dimensions.height
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let box = {
                x: i,
                y: j,
                set: false
            }
            model.boxes.push(box)
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
    $cols = document.getElementsByClassName('col')
}

function getDomBox(coorPair) {
    const $el = document.getElementsByClassName('col')[coorPair.x].children[coorPair.y]
    if($el){return $el}
}

function getModelBox(coorPair) {
    let match
    model.boxes.forEach(box => {
        if(box.x == coorPair.x && box.y == coorPair.y) {
            match = box
        }
    })
    return match
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
    const ranIndx = Math.floor(Math.random() * pieces.length)
    const randomPiece = pieces[ranIndx]
    model.currentPiece.type = ranIndx
    randomPiece.forEach((v) => {
        const val = (typeof v === 'object') ? Object.assign({}, v) : v
        model.currentPiece.coors.push(val)
    })
    drawCurrentPiece()  
}


function applyGravityToPiece() {
    mainInterval = setInterval(movePieceDownOneUnit, settings.speed)
}

function movePieceDownOneUnit() {
    if(legalMove('down')) {
        model.currentPiece.prevCoors = []
        setPrevPosInModel()
        model.currentPiece.coors.forEach(coorPair => coorPair.y++)
        eraseCurrentPiecePrevPos()
        drawCurrentPiece()
    } else {
        model.currentPiece.coors.forEach(coorPair => {
            getDomBox(coorPair).style.background = 'red'
            getModelBox(coorPair).set = true
        })
        checkForScoringRow()
        model.currentPiece.coors = []
        model.currentPiece.prevCoors = []
        spawnNewPeice()
    }
}

function checkForScoringRow() {
    let potentialScorers = model.boxes.filter(box => box.set)
}


function drawCurrentPiece() {
    model.currentPiece.coors.forEach(coorPair => {
        getDomBox(coorPair).style.background = 'blue'
    })
}

function eraseCurrentPiecePrevPos() {
    model.currentPiece.prevCoors.forEach(coorPair => {
        getDomBox(coorPair).style.background = 'none'
    })
}

function legalMove(bound) {
    let cnd = true
    if(bound == 'left') {
        model.currentPiece.coors.forEach(coorPair => {
            if(coorPair.x - 1 < 0 ) {
                cnd = false
            } else if(getDomBox(
                {
                    x: coorPair.x - 1,
                    y: coorPair.y
                }
            ).style.background == 'red') {
                cnd = false
            }
        })
    }
    if(bound == 'right') {
        model.currentPiece.coors.forEach(coorPair => {
            if(coorPair.x + 1 >= settings.dimensions.width) {
                cnd = false
            } else if(getDomBox(
                {
                    x: coorPair.x + 1,
                    y: coorPair.y
                }
            ).style.background == 'red') {
                cnd = false
            }
        })
    }
    if(bound == 'down') {
        model.currentPiece.coors.forEach(coorPair => {
            if(coorPair.y + 1 >= settings.dimensions.height) {
                cnd = false
            } else if(getDomBox(
                {
                    x: coorPair.x,
                    y: coorPair.y + 1
                }
            ).style.background == 'red') {
                cnd = false
            }
        })
    }
    return cnd
}

function setPrevPosInModel() {
    model.currentPiece.coors.forEach((v) => {
        const val = (typeof v === 'object') ? Object.assign({}, v) : v
        model.currentPiece.prevCoors.push(val)
    })
}

onPageLoad()