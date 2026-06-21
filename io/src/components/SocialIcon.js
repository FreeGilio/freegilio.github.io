import { PALETTE } from "../constants";
import { isSocialModalVisibleAtom, selectedLinkAtom, selectedLinkDescriptionAtom, store } from "../store";
import makeIcon from "./Icon";
import { opacityTrickleDown } from "../utils";

export default function makeSocialIcon(
    k, 
    parent, 
    posVec2, 
    imageData, 
    subtitle,
    link,
    description,
) {
    const [socialIcon, subtitleText] = makeIcon(
        k, 
        parent, 
        posVec2, 
        imageData, 
        subtitle
    );

    const linkSwitch = socialIcon.add([
        k.circle(50),
        k.color(k.Color.fromHex(PALETTE.color2)),
        k.anchor("center"),
        k.area(),
        k.pos(0,0),
        k.opacity(0),
    ]);

    linkSwitch.onCollide("player", () => {
      store.set(isSocialModalVisibleAtom, true);
      store.set(selectedLinkAtom, link);
      store.set(selectedLinkDescriptionAtom, description);
    });

    linkSwitch.onClick(() => {
      store.set(isSocialModalVisibleAtom, true);
      store.set(selectedLinkAtom, link);
      store.set(selectedLinkDescriptionAtom, description);
    });

    opacityTrickleDown(parent, [subtitleText]);

    return socialIcon;
}