import createKaplayCtx from "./kaplayCtx";

export default async function initGame(){
    const k = createKaplayCtx;
    k.loadSprite("player");
}