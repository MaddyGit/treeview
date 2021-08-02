import config from './config.js'
import calculateNodes from "./calculatecoords.js"

export async function draw(canvas, data) {

    const y = config.topMargin
    
    const {width, height} = calculateNodes(data, y)

    let ctx = canvas.getContext('2d')

    canvas.width = width + Math.floor(config.xGap / 3)
    canvas.height = height + config.yGap

    drawNodes(ctx, data)

    drawEdges(data, ctx)
}

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

function drawEdges(data, ctx) {

    if (data.children && (data.children.length > 0)) {

        data.children.forEach(child => {
            drawEdge(data, child, ctx)
            drawEdges(child, ctx)
        })
    }
}

function drawEdge(parent, child, ctx) {

    const { xSub, ySub } = getCircleSubtraction(parent, child)

    ctx.beginPath()
    ctx.moveTo((parent.x + xSub), (parent.y + ySub))
    ctx.lineTo((child.x - xSub), (child.y - ySub))
    ctx.stroke()
}

function getCircleSubtraction(parent, child) {
    const x1 = child.x, y1 = child.y, x2 = parent.x, y2 = parent.y
    const slopeAngle = Math.atan((y2 - y1) / (x2 - x1))

    return (x2 >= x1)
        ? { xSub: (-1 * (config.nodeRadius * Math.cos(slopeAngle))), ySub: (-1 * (config.nodeRadius * Math.sin(slopeAngle))) }
        : { xSub: (+1 * (config.nodeRadius * Math.cos(slopeAngle))), ySub: (+1 * (config.nodeRadius * Math.sin(slopeAngle))) }
}

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
