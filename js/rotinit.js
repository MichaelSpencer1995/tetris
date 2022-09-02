
function initRotation(type, rot) {
    switch(type) {
        case 'Line':
            switch(rot) {
                case 'rot0':
                    return [
                        new coordinatePair(model.curX, model.curY),
                        new coordinatePair(model.curX + 1, model.curY),
                        new coordinatePair(model.curX - 2, model.curY),
                        new coordinatePair(model.curX - 1, model.curY),
                    ]
                case 'rot1':
                    return [
                        new coordinatePair(model.curX, model.curY),
                        new coordinatePair(model.curX, model.curY - 1),
                        new coordinatePair(model.curX, model.curY - 2),
                        new coordinatePair(model.curX, model.curY - 3),
                    ]
            }
        case 'T':
            switch(rot) {
                case 'rot0':
                    return [
                        new coordinatePair(model.curX, model.curY),
                        new coordinatePair(model.curX, model.curY + 1),
                        new coordinatePair(model.curX + 1, model.curY + 1),
                        new coordinatePair(model.curX - 1, model.curY + 1)
                    ]
                case 'rot1':
                    return [
                        new coordinatePair(model.curX, model.curY + 1),
                        new coordinatePair(model.curX, model.curY),
                        new coordinatePair(model.curX, model.curY - 1),
                        new coordinatePair(model.curX - 1, model.curY)
                    ]
                case 'rot2':
                    return [
                        new coordinatePair(model.curX, model.curY - 1),
                        new coordinatePair(model.curX + 1, model.curY - 1),
                        new coordinatePair(model.curX - 1, model.curY - 1),
                        new coordinatePair(model.curX, model.curY)
                    ]
                case 'rot3':
                    return [
                        new coordinatePair(model.curX, model.curY),
                        new coordinatePair(model.curX - 1, model.curY + 1),
                        new coordinatePair(model.curX - 1, model.curY),
                        new coordinatePair(model.curX - 1, model.curY - 1)
                    ]
            }
        case 'Square':
            switch(rot) {
                case 'rot0':
                    return [
                        new coordinatePair(model.curX, model.curY),
                        new coordinatePair(model.curX, model.curY + 1),
                        new coordinatePair(model.curX + 1, model.curY),
                        new coordinatePair(model.curX + 1, model.curY + 1)
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
    {
        shape: 'T',
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('T', 'rot0'),
                () => initRotation('T', 'rot1'),
                () => initRotation('T', 'rot2'),
                () => initRotation('T', 'rot3'),
            ]
        }
    },
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
    {
        shape: 'Square',
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('Square', 'rot0')
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