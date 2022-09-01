const $start = document.getElementById('start')
const $gameBoard = document.getElementsByClassName('gameboard')[0]

let $cols

let wHeld, aHeld, sHeld, dHeld
let mainInterval

const model = {
    boxes: [],
    currentPiece: {
        type: null,
        coors: [],
        prevCoors: [],
    },
    curY: 0,
    curX: settings.dimensions.width % 2 != 0 ? settings.dimensions.width / 2 + 0.5 : settings.dimensions.width / 2
}

$start.addEventListener('click', () => {
    if(settings.dimensions.width < 5 || settings.dimensions.height < 7) {
        return console.error('invalid gameboard dimensions')
    }
    $start.style.display = 'none'
    launch()
})

document.addEventListener('keydown', (e) => {
    if(e.keyCode == 65) {
        if(aHeld) {
            return
        } else {
            aHeld = true
            if(legalMove('left')) {
                setPrevPosInModel()
                model.currentPiece.coors.forEach(coorPair => {
                    coorPair.x--
                })
                eraseCurrentPiecePrevPos()
                drawCurrentPiece()
            }
        }
    }
    if(e.keyCode == 68) {
        if(dHeld) {
            return
        } else {
            dHeld = true
            if(legalMove('right')) {
                setPrevPosInModel()
                model.currentPiece.coors.forEach(coorPair => {
                    coorPair.x++
                })
                eraseCurrentPiecePrevPos()
                drawCurrentPiece()
            }
        }
    }
    if(e.keyCode == 83) {if
        (sHeld) {
            return
        } else {
            sHeld = true
            increaseVelocity()
        }
    }
    if(e.keyCode == 87) {
        if(wHeld) {
            return
        } else {
            wHeld = true
            rotatePiece()
        }
    }
})

document.addEventListener('keyup', (e) => {
    if(e.keyCode == 65) {
        aHeld = false
    }
    if(e.keyCode == 68) {
        dHeld = false
    }
    if(e.keyCode == 83) {
        sHeld = false
        decreaseVelocity()
    }
    if(e.keyCode == 87) {
        wHeld = false
    }
})