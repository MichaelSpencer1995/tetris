const settings = {
    dev: true,
    dimensions: {
        unit: 40,
        width: 11,
        height: 7,
    },
    speed: 100,
    devPiece: 1
}

let origin = {
    x: undefined,
    y: 0
}

if(settings.dimensions.width % 2 != 0) {
    origin.x = settings.dimensions.width / 2 + 0.5
} else {
    origin.x = settings.dimensions.width / 2
}

const pieces = [
    [
        // T shape
        origin,
        { x: origin.x, y: origin.y + 1 },
        { x: origin.x + 1, y: origin.y + 1 },
        { x: origin.x - 1, y: origin.y + 1 }
    ],
    [
        // Line shape
        origin,
        { x: origin.x + 1, y: origin.y },
        { x: origin.x - 2, y: origin.y },
        { x: origin.x - 1, y: origin.y }
    ],
    [
        // Square shape
        origin,
        { x: origin.x , y: origin.y + 1 },
        { x: origin.x - 1 , y: origin.y },
        { x: origin.x - 1 , y: origin.y + 1 }
    ],
    [
        // Regular L shape
        origin,
        { x: origin.x - 1, y: origin.y },
        { x: origin.x - 2, y: origin.y },
        { x: origin.x - 2, y: origin.y + 1}
    ],
    [
        // Backwards L shape
        origin,
        { x: origin.x, y: origin.y + 1},
        { x: origin.x - 1 , y: origin.y },
        { x: origin.x - 2, y: origin.y }
    ],
    [
        // S shape
        origin,
        { x: origin.x + 1, y: origin.y },
        { x: origin.x, y: origin.y + 1 },
        { x: origin.x - 1, y: origin.y + 1 }
    ],
    [
        // Z shape
        origin,
        { x: origin.x - 1, y: origin.y },
        { x: origin.x, y: origin.y + 1 },
        { x: origin.x + 1, y: origin.y + 1 }
    ]
]