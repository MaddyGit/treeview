import config from './config.js'

let xStart, yMax

export default function calculateNodes(parent, y) {
    
    xStart = 0
    yMax = y

    _calculateNodes(parent, y)
    return {width: xStart, height: yMax}
}

function _calculateNodes(parent, y) {

    if (yMax < y)
        yMax = y

    if (parent.children && (parent.children.length > 0)) {

        parent.children.forEach(child => {
            _calculateNodes(child, (y + config.yGap))
        });

        fillParentCoordinates(parent)
    }

    else {

        parent.x = (xStart + Math.floor(config.nodeSpan / 2))
        parent.y = y
        xStart += config.xGap
    }
}

function fillParentCoordinates(parent) {

    const nosChildren = parent.children.length
    const firstChild = parent.children[0]
    const lastChild = parent.children[(nosChildren - 1)]
    const y = (firstChild.y - config.yGap)

    if ((nosChildren % 2) == 0) {
        parent.x = (((lastChild.x - firstChild.x) / 2) + firstChild.x)
        parent.y = y
    }

    else {
        const middleChildIndex = Math.floor(nosChildren / 2)
        parent.x = parent.children[middleChildIndex].x
        parent.y = y
    }
}
