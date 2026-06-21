import { PALETTE } from "../constants";
import { emailAtom, isEmailModalVisibleAtom, store } from "../store";
import makeIcon from "./Icon";
import { opacityTrickleDown } from "../utils";


export default function makeEmailIcon(
    k, 
    parent, 
    posVec2, 
    imageData, 
    subtitle,
    email,
) {
    const [emailIcon, subtitleText] = makeIcon(
        k, 
        parent, 
        posVec2, 
        imageData, 
        subtitle
    );

    const emailSwitch = emailIcon.add([
        k.circle(50),
        k.color(k.Color.fromHex(PALETTE.color2)),
        k.anchor("center"),
        k.area(),
        k.pos(0,0),
        k.opacity(0),
    ]);

    emailSwitch.onCollide("player", () => {
      store.set(isEmailModalVisibleAtom, true);
      store.set(emailAtom, email);
    });

     emailSwitch.onClick(() => {
        store.set(isEmailModalVisibleAtom, true);
        store.set(emailAtom, email);
    });

    opacityTrickleDown(parent, [subtitleText]);

    return emailIcon;
}
