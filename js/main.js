import { draw } from './draw.js'
import config from './config.js'

let sampletree, canvas, ctx

async function loadData() {
    await fetch('js/sampletree.json')
        .then(rs => rs.json())
        .then(data => { sampletree = data })
}

function initCanvas() {
    canvas = document.createElement('canvas')

    let canvasDiv = document.getElementById('draw-area')
    canvasDiv.appendChild(canvas)

    ctx = canvas.getContext('2d')
}

await loadData()
initCanvas()

// Delegate Drawing
draw(canvas, sampletree)

const xGapInput = document.getElementById('input-x-gap')
xGapInput.value = config.xGap

xGapInput.addEventListener('change', ev => {
    config.xGap = Number(ev.target.value)
    reDraw()
})


const yGapInput = document.getElementById('input-y-gap')
yGapInput.value = config.yGap

yGapInput.addEventListener('change', ev => {
    config.yGap = Number(ev.target.value)
    reDraw()
})

const nodeRadiusInput = document.getElementById('input-node-radius')
nodeRadiusInput.value = config.nodeRadius

nodeRadiusInput.addEventListener('change', ev => {
    config.nodeRadius = Number(ev.target.value)
    reDraw()
})

async function reDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    sampletree = undefined
    await loadData()
    draw(canvas, sampletree)
}