import { PALETTE } from "../constants";
import makeIcon from "./Icon";


export default function makeSkillIcon(k, parent, posVec2, imageData, subtitle) {
    const [skillIcon, subtitleText] = makeIcon(
        k, 
        parent, 
        posVec2, 
        imageData, 
        subtitle
    );

    skillIcon.use(
        k.area({ shape: new k.Rect(k.vec2(0), skillIcon.width + 50, skillIcon.height + 65)})
    );
    skillIcon.use(k.body({drag: 1}));
    skillIcon.onCollide("player", (player) => {
        skillIcon.applyImpulse(player.direction.scale(1000));
    });

    // TODO : Opacity modifier for child game objects

    return skillIcon;
}