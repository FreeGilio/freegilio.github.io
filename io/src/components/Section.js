import { PALETTE, SPRITE_SCALE } from "../constants";

export default function makeSection(k, posVec2, sectionName, onCollide = null) {
  const section = k.add([
    //k.sprite("portbeacon", {anim: "walk-down-idle"}),
    //k.scale(SPRITE_SCALE),
    k.rect(200, 200, { radius: 10 }),
    k.anchor("center"),
    k.area(),
    k.pos(posVec2),
    k.color(PALETTE.color1),
    k.opacity(0),
    sectionName,
  ]);

  section.add([
    k.text(sectionName, {font: "minecraft", size: 64}),
    k.color(PALETTE.color2),
    k.anchor("center"),
    k.pos(0, -170),
  ]);

  section.add([
    k.sprite("portbeacon", {anim: "stand"}),
    k.scale(SPRITE_SCALE),
    k.anchor("center"),
  ]);

 let activated = false;

    const activate = () => {
        if (activated) return;

        activated = true;
        onCollide?.(section);
    };

    if (onCollide) {
        section.onCollide("player", activate);
        section.onClick(activate);
    }

    return section;
}