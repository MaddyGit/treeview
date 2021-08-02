function getConfig() {

    let topMargin = 75
    let xGap = 80
    let yGap = 80
    let nodeSpan = 100
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
        ,
        get nodeSpan() {
            return nodeSpan
        }
        ,
        set nodeSpan(value) {
            nodeSpan = value
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