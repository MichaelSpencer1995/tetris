
function initRotation(type, rot) {
    switch(type) {
        case 'Line':
            switch(rot) {
                case 'rot0':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 2, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                    ]
                case 'rot1':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y - 2),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y - 3),
                    ]
            }
        case 'T':
            switch(rot) {
                case 'rot0':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y + 1)
                    ]
                case 'rot1':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y - 1)
                    ]
                case 'rot2':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1)
                    ]
                case 'rot3':
                    return [
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y)
                    ]
            }
        case 'Square':
            switch(rot) {
                case 'rot0':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y + 1)
                    ]
            }
        case 'Regular L':
            switch(rot) {
                case 'rot0':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x - 2, model.rotOrigin.y + 1)
                    ]
                case 'rot1':
                    return [
                        new CoordinatePair(model.rotOrigin.x - 2, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x - 2, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x - 2, model.rotOrigin.y + 1)
                    ]
                case 'rot2':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 2, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 2, model.rotOrigin.y + 1)
                    ]
                case 'rot3':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1)
                    ]
            }
        case 'Backwards L':
            switch(rot) {
                case 'rot0':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y + 1)
                    ]
                case 'rot1':
                    return [
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1)
                    ]
                case 'rot2':
                    return [
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y + 1)
                    ]
                case 'rot3':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y - 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y + 1)
                    ]
            }
        case 'Z':
            switch(rot) {
                case 'rot0':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y + 1)
                    ]
                case 'rot1':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y - 1)
                    ]
            }
        case 'N':
            switch(rot) {
                case 'rot0':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x + 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y + 1)
                    ]
                case 'rot1':
                    return [
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y),
                        new CoordinatePair(model.rotOrigin.x, model.rotOrigin.y + 1),
                        new CoordinatePair(model.rotOrigin.x - 1, model.rotOrigin.y - 1)
                    ]
            }
    }
}

function CoordinatePair(x, y) {
    this.x = x
    this.y = y
}

let pieces = [
    {
        shape: 'Line',
        color: colors.line,
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('Line', 'rot0'),
                () => initRotation('Line', 'rot1')
            ]
        }
    },
    {
        shape: 'T',
        color: colors.t,
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('T', 'rot0'),
                () => initRotation('T', 'rot1'),
                () => initRotation('T', 'rot2'),
                () => initRotation('T', 'rot3'),
            ],
            rotOrigin: {
                x: 0,
                y: 0
            }
        }
    },
    {
        shape: 'Square',
        color: colors.square,
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('Square', 'rot0')
            ]
        }
    },
    {
        shape: 'L',
        color: colors.l,
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('Regular L', 'rot0'),
                () => initRotation('Regular L', 'rot1'),
                () => initRotation('Regular L', 'rot2'),
                () => initRotation('Regular L', 'rot3')
            ]
        }
    },
    {
        shape: 'Backwards L',
        color: colors.backwardsL,
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('Backwards L', 'rot0'),
                () => initRotation('Backwards L', 'rot1'),
                () => initRotation('Backwards L', 'rot2'),
                () => initRotation('Backwards L', 'rot3')
            ]
        }
    },
    {
        shape: 'Z',
        color: colors.z,
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('Z', 'rot0'),
                () => initRotation('Z', 'rot1')
            ]
        }
    },
    {
        shape: 'N',
        color: colors.n,
        rotData: {
            rot: 0,
            rots: [
                () => initRotation('N', 'rot0'),
                () => initRotation('N', 'rot1')
            ]
        }
    }
]

if(settings.dev) {
    pieces = [
        {
            shape: 'Line',
            color: colors.line,
            rotData: {
                rot: 0,
                rots: [
                    () => initRotation('Line', 'rot0'),
                    () => initRotation('Line', 'rot1')
                ]
            }
        }
    ]
}