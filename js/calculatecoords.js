import config from './config.js'

let xStart, yMax

// init starting values and call _calculateNodes
export default function calculateNodes(parent, y) {
    
    // starting point x (left most point, after drawing each leaf node this 
    // increments by horizontal gap so that next leaf would not run into previous leaf)
    xStart = 0

    // max depth tree ran into
    yMax = y

    _calculateNodes(parent, y)
    return {width: xStart, height: yMax}
}

// calculate x, y coordinates for each node
function _calculateNodes(parent, y) {

    if (yMax < y)
        yMax = y

    if (parent.children && (parent.children.length > 0)) {
        // it's non-leaf node, so iterate through all children and then calculate parent coordinates

        parent.children.forEach(child => {
            _calculateNodes(child, (y + config.yGap))
        });

        fillParentCoordinates(parent)
    }

    else {
        // it's leaf node so add coordinates and increment xStart by horizontal gap
        parent.x = (xStart + Math.floor(config.xGap / 2))
        parent.y = y
        xStart += config.xGap
    }
}

// calculate parent coordinates (above middle child if odd number of children
// , between first and last child if even number of children)
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
