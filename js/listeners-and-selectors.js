const $start = document.getElementById('start')
const $gameBoard = document.getElementsByClassName('gameboard')[0]
let $cols

let wHeld, aHeld, sHeld, dHeld
let mainInterval

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
    if(e.keyCode == 83){if(sHeld){return}else{sHeld = true}}
    if(e.keyCode == 87) {
        if(wHeld) {
            return
        } else {
            wHeld = true

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
    }
    if(e.keyCode == 87) {
        wHeld = false
    }
})