function getConfig() {

    // margin from the top of the canvas
    let topMargin = 75

    // horizontal gap between nodes
    let xGap = 80

    // vertical gap between nodes
    let yGap = 80

    // radius of circle (which represents node visually and has node's data displayed in it)
    let nodeRadius = 25


    return {
        get topMargin() {
            return topMargin
        }
        ,
        set topMargin(value) {
            topMargin = value
        }
        ,
        get xGap() {
            return xGap
        }
        , set xGap(value) {
            xGap = value
        }
        ,
        get yGap() {
            return yGap
        }
        , set yGap(value) {
            yGap = value
        }
        , get nodeRadius() {
            return nodeRadius
        }
        , set nodeRadius(value) {
            nodeRadius = value
        }
    }
}

const baseConfig = new getConfig

export default baseConfig