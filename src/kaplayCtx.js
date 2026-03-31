import kaplay from "kaplay";

export default function createKaplayCtx() {
    return kaplay({
        global: false,
        pixelDensity: 2,
        touchToMouse: true,
        debug: true, // set to false
        debugKey: "f1",
        canvas: document.getElementById("game"),
    })
}