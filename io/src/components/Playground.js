import { SPRITE_SCALE } from "../constants";

export default function createArea(k){
    const grassarea = k.add([
        k.sprite("grass-area"),
        k.scale(SPRITE_SCALE),
        k.anchor("center"),
        //k.area({ shape: new k.Rect(k.vec2(0), 20, 20)}),
        k.body({isStatic: true}),
        k.pos(-500,0),
    ]);
}