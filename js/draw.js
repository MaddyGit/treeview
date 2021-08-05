import config from './config.js'
import calculateNodes from "./calculatecoords.js"

export async function draw(canvas, data) {

    const y = config.topMargin

    const { width, height } = calculateNodes(data, y)

    let ctx = canvas.getContext('2d')

    canvas.width = width + Math.floor(config.xGap / 3)
    canvas.height = height + config.yGap

    drawNodes(ctx, data)

    drawEdges(data, ctx)
}

// iterate over all nodes and for each node, draw a circle with data of the node
function drawNodes(ctx, data) {

    if (data.children && (data.children.length > 0)) {

        drawCircle(data.data, data.x, data.y, config.nodeRadius, ctx)

        data.children.forEach(child => {
            drawNodes(ctx, child)
        })
    }

    else {
        drawCircle(data.data, data.x, data.y, config.nodeRadius, ctx)
    }
}

// iterate all nodes having children and draw edges from parent to children
function drawEdges(data, ctx) {

    if (data.children && (data.children.length > 0)) {

        data.children.forEach(child => {
            drawEdge(data, child, ctx)
            drawEdges(child, ctx)
        })
    }
}

// draw actual line (edge) on canvas
function drawEdge(parent, child, ctx) {

    const { xSub, ySub } = getCircleSubtraction(parent, child)

    ctx.beginPath()
    ctx.moveTo((parent.x + xSub), (parent.y + ySub))
    ctx.lineTo((child.x - xSub), (child.y - ySub))
    ctx.stroke()
}

// find coordinates to be subtracted so that the edge line drawn won't be 
// from parent circle's center to child circle's center, 
// rather it will be from parent circle's circumference to child circle's circumference
function getCircleSubtraction(parent, child) {
    const x1 = child.x, y1 = child.y, x2 = parent.x, y2 = parent.y
    const slopeAngle = Math.atan((y2 - y1) / (x2 - x1))

    return (x2 >= x1)
        ? { xSub: (-1 * (config.nodeRadius * Math.cos(slopeAngle))), ySub: (-1 * (config.nodeRadius * Math.sin(slopeAngle))) }
        : { xSub: (+1 * (config.nodeRadius * Math.cos(slopeAngle))), ySub: (+1 * (config.nodeRadius * Math.sin(slopeAngle))) }
}

// draw actual circle on canvas
function drawCircle(data, x, y, r, ctx) {

    const lineWidth = ctx.lineWidth
    ctx.lineWidth = 3

    ctx.beginPath()
    ctx.arc(x, y, r, 0, (2 * Math.PI))
    ctx.stroke()

    ctx.font = '18px serif'
    ctx.fillText(data, x - Math.floor(config.nodeRadius / 2), y + 9)

    ctx.lineWidth = lineWidth
}
