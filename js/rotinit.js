
function initRotation(type, rot) {
    if(type == 'Line') {
        if(rot == 'rot0') {
            return [
                new coordinatePair(model.curX, model.curY),
                new coordinatePair(model.curX + 1, model.curY),
                new coordinatePair(model.curX - 2, model.curY),
                new coordinatePair(model.curX - 1, model.curY),
            ]
        }
        if(rot == 'rot1') {
            return [
                new coordinatePair(model.curX, model.curY),
                new coordinatePair(model.curX, model.curY - 1),
                new coordinatePair(model.curX, model.curY - 2),
                new coordinatePair(model.curX, model.curY - 3),
            ]
        }
    }
}

class coordinatePair {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

const pieces = [
    // [
    //     // T shape
    //     origin,
    //     { x: origin.x, y: origin.y + 1 },
    //     { x: origin.x + 1, y: origin.y + 1 },
    //     { x: origin.x - 1, y: origin.y + 1 }
    // ],
    {
        shape: 'Line',
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('Line', 'rot0'),
                () => initRotation('Line', 'rot1')
            ]
        }
    },
    // [
    //     // Square shape
    //     origin,
    //     { x: origin.x , y: origin.y + 1 },
    //     { x: origin.x - 1 , y: origin.y },
    //     { x: origin.x - 1 , y: origin.y + 1 }
    // ],
    // [
    //     // Regular L shape
    //     origin,
    //     { x: origin.x - 1, y: origin.y },
    //     { x: origin.x - 2, y: origin.y },
    //     { x: origin.x - 2, y: origin.y + 1}
    // ],
    // [
    //     // Backwards L shape
    //     origin,
    //     { x: origin.x, y: origin.y + 1},
    //     { x: origin.x - 1 , y: origin.y },
    //     { x: origin.x - 2, y: origin.y }
    // ],
    // [
    //     // S shape
    //     origin,
    //     { x: origin.x + 1, y: origin.y },
    //     { x: origin.x, y: origin.y + 1 },
    //     { x: origin.x - 1, y: origin.y + 1 }
    // ],
    // [
    //     // Z shape
    //     origin,
    //     { x: origin.x - 1, y: origin.y },
    //     { x: origin.x, y: origin.y + 1 },
    //     { x: origin.x + 1, y: origin.y + 1 }
    // ]
]