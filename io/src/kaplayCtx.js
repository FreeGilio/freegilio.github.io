import kaplay from "kaplay";

export default function createKaplayCtx(){
    return kaplay({
        global: false,
        pixelDensity: 2,
        touchToMouse: true,
        debug: true,
        debugKey: "f1",
        canvas: document.getElementById("game"),
    });
}