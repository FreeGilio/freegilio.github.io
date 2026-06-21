import { PALETTE } from "../constants";
import { opacityTrickleDown } from "../utils";
import makeIcon from "./Icon";
import { SPRITE_SCALE } from "../constants";


export default function makeSkillIcon(k, parent, posVec2, imageData, subtitle, link) {
    const [skillIcon, subtitleText] = makeIcon(
        k, 
        parent, 
        posVec2, 
        imageData, 
        subtitle,
        link
    );

    skillIcon.use(
        k.area({ shape: new k.Rect(k.vec2(0), skillIcon.width + 50, skillIcon.height + 65)})
    );
    skillIcon.use(k.body({drag: 1}));
    skillIcon.onCollide("player", (player) => {
        skillIcon.applyImpulse(player.direction.scale(1000));
    });

    skillIcon.onClick(() => {
    window.open(link, "_blank");
    });

    opacityTrickleDown(parent, [subtitleText]);

    return skillIcon;
}