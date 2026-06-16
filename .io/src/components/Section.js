import { PALETTE, SPRITE_SCALE } from "../constants";

export default function makeSection(k, posVec2, sectionName, onCollide = null) {
  const section = k.add([
    //k.sprite("portbeacon"),
    //k.scale(SPRITE_SCALE),
    k.rect(200, 200, { radius: 10 }),
    k.anchor("center"),
    k.area(),
    k.pos(posVec2),
    k.color(PALETTE.color1),
    sectionName,
  ]);

  section.add([
    k.text(sectionName, {font: "ibm-bold", size: 64}),
    k.color(PALETTE.color2),
    //k.scale(SPRITE_SCALE / 64),
    k.anchor("center"),
    k.pos(0, -20),
  ]);

  if (onCollide) {
    const onCollideController = section.onCollide("player", () => {
      console.log("COLLISION");
      onCollide(section);
      onCollideController.cancel();
    });
  }

    return section;
}