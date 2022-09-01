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

function resetOrigin() {
    model.curY = 0
    model.curX = settings.dimensions.width % 2 != 0 ? settings.dimensions.width / 2 + 0.5 : settings.dimensions.width / 2
}

function resetRotationIndexes() {
    pieces.forEach(piece => piece.rotData.rot = 0)
}

function spawnNewPeice() {
    // if(cant spawn bc pieces in the way) {
    //     gameover()
    // })
    resetOrigin()
    resetRotationIndexes()
    const ranIndx = settings.dev ? settings.devPiece : Math.floor(Math.random() * pieces.length)
    const randomPiece = pieces[ranIndx].rotData.rots[0]()
    model.currentPiece.type = ranIndx
    console.log(randomPiece)
    randomPiece.forEach((v) => {
        const val = (typeof v === 'object') ? Object.assign({}, v) : v
        model.currentPiece.coors.push(val)
    })
    for(let i = 0; i < model.currentPiece.coors.length; i++) {
        if(getDomBox(model.currentPiece.coors[i]).style.background == 'red') {
            clearInterval(mainInterval)
            console.log("GAME OVER")
            break
        }
    }
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
    console.log('check for scoring row')
}

function increaseVelocity() {
    console.log('increase velocity')
}

function decreaseVelocity() {
    console.log('decrease velocity')
}

function rotatePiece() {
    setCurXandYofPiece()
    setPrevPosInModel()
    // this cycles through the rots in the matrix
    if(pieces[0].rotData.rot + 1 > pieces[0].rotData.rots.length - 1) {
        pieces[0].rotData.rot = 0
    } else {
        pieces[0].rotData.rot++
    }
    if(model.currentPiece.type == 0) {
        model.currentPiece.coors = []
        const rot = pieces[0].rotData.rots[pieces[0].rotData.rot]()
        // check if rot0 valid rotation can be made to be
        rot.forEach((v) => {
            const val = (typeof v === 'object') ? Object.assign({}, v) : v
            model.currentPiece.coors.push(val)
        })
    }
    eraseCurrentPiecePrevPos()
    drawCurrentPiece()
}

function setCurXandYofPiece() {
    // these determine a a center for which the piece to be rotated around, incase I ever want to add more intense pieces
    // instead of hard coding the centers for each piece
    let lowYBound = 0
    let leftXBound, rightXBound, xAvg

    model.currentPiece.coors.forEach((coorPair, i) => {
        if(coorPair.y > lowYBound) {
            lowYBound = coorPair.y
        }
        if(i == 0) {
            leftXBound = coorPair.x
            rightXBound = coorPair.x
        } else {
            if(coorPair.x < leftXBound) {
                leftXBound = coorPair.x
            }
            if(coorPair.x > rightXBound) {
                rightXBound = coorPair.x
            }
        }
    })

    xAvg = (rightXBound + leftXBound) % 2 == 0 ? (rightXBound + leftXBound) / 2 : (rightXBound + leftXBound) / 2 + 0.5

    model.curY = lowYBound
    model.curX = xAvg
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