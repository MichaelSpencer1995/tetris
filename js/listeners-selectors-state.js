const $start = document.getElementById('start')
const $gameBoard = document.getElementsByClassName('gameboard')[0]
const $score = document.getElementById('score')

let $cols

let wHeld, aHeld, sHeld, dHeld
let mainInterval
let startGame = true
let controlsLocked = true

const model = {
    score: 0,
    boxes: [],
    currentPiece: {
        type: null,
        color: null,
        coors: [],
        prevCoors: []
    },
    rotOrigin: {
        x: settings.dimensions.width % 2 != 0 ? settings.dimensions.width / 2 + 0.5 : settings.dimensions.width / 2,
        y: 0
    }
}

document.addEventListener('keydown', (e) => {
    if(e.keyCode == 65) {
        if(controlsLocked) {
            return
        }
        if(legalMove(model.currentPiece.coors, 'left')) {
            setPrevPosInModel()
            model.currentPiece.coors.forEach(coorPair => {
                coorPair.x--
            })
            model.rotOrigin.x--
            eraseCurrentPiecePrevPos()
            drawCurrentPiece()
        }
    }
    if(e.keyCode == 68) {
        if(controlsLocked) {
            return
        }
        if(legalMove(model.currentPiece.coors, 'right')) {
            setPrevPosInModel()
            model.currentPiece.coors.forEach(coorPair => {
                coorPair.x++
            })
            model.rotOrigin.x++
            eraseCurrentPiecePrevPos()
            drawCurrentPiece()
        }
    }
    if(e.keyCode == 83) {
        if(sHeld || controlsLocked) {
            return
        } else {
            sHeld = true
            increaseVelocity()
        }
    }
    if(e.keyCode == 87) {
        if(startGame) {
            controlsLocked = false
            if(settings.dimensions.width < 5 || settings.dimensions.height < 7) {
                return console.error('invalid gameboard dimensions')
            }
            startGame = false
            $start.style.display = 'none'
            launch()
        } else {
            if(wHeld) {
                return
            } else {
                wHeld = true
                rotatePiece()
            }
        }
    }
    if(e.keyCode == 32) {
        console.log('pop piece')
    }
})

document.addEventListener('keyup', (e) => {
    if(e.keyCode == 83) {
        sHeld = false
        decreaseVelocity()
    }
    if(e.keyCode == 87) {
        wHeld = false
    }
})