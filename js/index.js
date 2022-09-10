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
                set: false,
                scorer: false
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

function resetOrigin() {
    model.rotOrigin.y = 0
    model.rotOrigin.x = settings.dimensions.width % 2 != 0 ? settings.dimensions.width / 2 + 0.5 : settings.dimensions.width / 2
}

function resetRotationIndexes() {
    pieces.forEach(piece => piece.rotData.rot = 0)
}

function spawnNewPeice() {
    model.score++
    $score.innerHTML = model.score
    resetOrigin()
    resetRotationIndexes()
    const ranIndx = Math.floor(Math.random() * pieces.length)
    const randomPiece = pieces[ranIndx].rotData.rots[0]()
    model.currentPiece.type = ranIndx
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
    mainInterval = setInterval(movePieceDownOneUnit, settings.speed.regular)
}

function movePieceDownOneUnit() {
    if(legalMove(model.currentPiece.coors, 'down')) {
        model.currentPiece.prevCoors = []
        setPrevPosInModel()
        model.currentPiece.coors.forEach(coorPair => coorPair.y++)
        model.rotOrigin.y++
        eraseCurrentPiecePrevPos()
        drawCurrentPiece()
    } else {
        model.currentPiece.coors.forEach(coorPair => {
            getDomBox(coorPair).style.background = 'red'
            getDomBox(coorPair).style.boxShadow = 'inset 0px 0px 0px 1px red'

            getModelBox(coorPair).set = true
        })
        checkForScoringRow()
        model.currentPiece.coors = []
        model.currentPiece.prevCoors = []
        spawnNewPeice()
    }
}

function checkForScoringRow() {
    const potentialScorers = groupBy(model.boxes.filter(box => box.set), 'y')
    const scorers = []
    for(const group in potentialScorers) {
        if(potentialScorers[group].length == settings.dimensions.width) {
            potentialScorers[group].forEach(scorer => scorers.push(scorer))
        }
    }
    if(scorers.length != 0) {
        scorers.forEach(scorer => {
            getModelBox(scorer).scorer = true
        })
        scoreRows()
    }
}

function scoreRows() {
    clearInterval(mainInterval)
    $cols = document.getElementsByClassName('col')
    for(let i = 0; i < $cols.length; i++) {
        let scorerIndex = -1
        for(let j = 0; j < $cols[i].children.length; j++) {
            if(getModelBox({ x: i, y: j }).scorer) {
                getModelBox({ x: i, y: j }).scorer = false
                scorerIndex = j
                $cols[i].children[j].style.background = 'green'
            }
        }
        for(let k = 0; k < scorerIndex; k++) {
            getDomBox({x: i, y: k}).style.background = 'orange'
            console.log(getDomBox({x: i, y: k}))
        }
    }
}

function increaseVelocity() {
    clearInterval(mainInterval)
    mainInterval = setInterval(movePieceDownOneUnit, settings.speed.fast)
}

function decreaseVelocity() {
    clearInterval(mainInterval)
    mainInterval = setInterval(movePieceDownOneUnit, settings.speed.regular)
}

function rotatePiece() {
    setPrevPosInModel()
    // this cycles through the rots in the matrix
    if(pieces[model.currentPiece.type].rotData.rot + 1 > pieces[model.currentPiece.type].rotData.rots.length - 1) {
        pieces[model.currentPiece.type].rotData.rot = 0
    } else {
        pieces[model.currentPiece.type].rotData.rot++
    }
    const newRotCoors = pieces[model.currentPiece.type].rotData.rots[pieces[model.currentPiece.type].rotData.rot]()
    setSpecialRotCnds(newRotCoors)
    if(!pieceInWay(newRotCoors)) {
        model.currentPiece.coors = []
        newRotCoors.forEach((v) => {
            const val = (typeof v === 'object') ? Object.assign({}, v) : v
            model.currentPiece.coors.push(val)
        })
    }
    eraseCurrentPiecePrevPos()
    drawCurrentPiece()
}

function pieceInWay(coors) {
    let cnd = false
    coors.forEach(coorPair => {
        if(getDomBox(coorPair).style.background == 'red') {
            cnd = true
        }
    })
    return cnd
}

function setSpecialRotCnds(coors) {
    let outOfBounds = false
    coors.forEach(coorPair => {
        if(coorPair.x < 0) {
            outOfBounds = 'left'
        }
        if(coorPair.x > settings.dimensions.width - 1) {
            outOfBounds = 'right'
        }
        if(coorPair.y < 0) {
            outOfBounds = 'upper'
        }
    })
    if(outOfBounds == 'left') {
        coors.forEach(coorPair => coorPair.x++)
        setSpecialRotCnds(coors)
    }
    if(outOfBounds == 'right') {
        coors.forEach(coorPair => coorPair.x--)
        setSpecialRotCnds(coors)
    }
    if(outOfBounds == 'upper') {
        coors.forEach(coorPair => coorPair.y++)
        setSpecialRotCnds(coors)
    }
    return
}

function drawCurrentPiece() {
    model.currentPiece.coors.forEach(coorPair => {
        const $el = getDomBox(coorPair)
        $el.style.background = 'blue'
        $el.style.boxShadow = 'inset 0px 0px 0px 1px blue'
    })
}

function eraseCurrentPiecePrevPos() {
    model.currentPiece.prevCoors.forEach(coorPair => {
        const $el = getDomBox(coorPair)
        $el.style.boxShadow = 'inset 0px 0px 0px 1px #ddd'
        $el.style.background = 'none'
    })
}

function legalMove(set, bound) {
    let cnd = true
    if(bound == 'left') {
        set.forEach(coorPair => {
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
        set.forEach(coorPair => {
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
        set.forEach(coorPair => {
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

function groupBy(arr, property) {
  return arr.reduce(function(memo, x) {
    if(!memo[x[property]]) {
        memo[x[property]] = []
    }
    memo[x[property]].push(x)
    return memo
  }, {})
}


onPageLoad()