const settings = {
    dimensions: {
        unit: 30,
        width: 13,
        height: 20,
    },
    speed: 750
}

let origin = {
    x: undefined,
    y: 0
}

if(settings.dimensions.width % 2 != 0) {
    origin.x = settings.dimensions.width / 2 - 0.5
} else {
    origin.x = settings.dimensions.width / 2
}

const pieces = [
    [
        origin,
        { x: origin.x, y: origin.y + 1 },
        { x: origin.x + 1, y: origin.y + 1 },
        { x: origin.x - 1, y: origin.y + 1 },
    ],
    [
        origin,
        { x: origin.x + 1, y: origin.y },
        { x: origin.x + 2, y: origin.y },
        { x: origin.x - 1, y: origin.y },
    ],
    [
        origin,
        { x: origin.x , y: origin.y + 1 },
        { x: origin.x + 1 , y: origin.y },
        { x: origin.x + 1 , y: origin.y + 1 },
    ],
    [
        origin,
        { x: origin.x + 1 , y: origin.y },
        { x: origin.x - 1, y: origin.y },
        { x: origin.x - 1 , y: origin.y + 1},
    ],
]