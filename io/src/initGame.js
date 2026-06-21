import { PALETTE } from "./constants";
import createPlayer from "./entities/Player";
import createArea from "./components/Playground";
import createKaplayCtx from "./kaplayCtx";
import { cameraZoomValueAtom, store } from "./store";
import makeSection from "./components/Section";
import makeEmailIcon from "./components/EmailIcon";
import makeSocialIcon from "./components/SocialIcon";
import { makeAppear } from "./utils";
import makeSkillIcon from "./components/SkillIcon";
import makeExperienceCard from "./components/ExperienceCard";
import makeProjectCard from "./components/ProjectCard";
import { SPRITE_SCALE } from "./constants";

export default async function initGame() {
    const generalData = await (await fetch("./configs/generalData.json")).json();
    const socialsData = await (await fetch("./configs/socialsData.json")).json();
    const skillsData = await (await fetch("./configs/skillsData.json")).json();
    const experiencesData = await (await fetch("./configs/experiencesData.json")).json();
    const projectsData = await (await fetch("./configs/projectsData.json")).json();

    const k = createKaplayCtx();
    k.loadSprite("player", "./sprites/bakari.png",{
        sliceX: 4,
        sliceY: 16,
        anims:{
            "walk-down-idle": { from: 0, to: 3, loop: true, speed: 5 },
            "walk-left-down-idle": { from: 4, to: 7, loop: true, speed: 5 },
            "walk-left-idle": { from: 8, to: 11, loop: true, speed: 5 },
            "walk-left-up-idle": { from: 12, to: 15, loop: true, speed: 5 },
            "walk-up-idle": { from: 16, to: 19, loop: true, speed: 5 },
            "walk-right-up-idle": { from: 20, to: 23, loop: true, speed: 5 },
            "walk-right-idle": { from: 24, to: 27, loop: true, speed: 5 },
            "walk-right-down-idle": { from: 28, to: 31, loop: true, speed: 5 },
            "walk-down": { from: 32, to: 35, loop: true },
            "walk-left-down": { from: 36, to: 39, loop: true },
            "walk-left": { from: 40, to: 43, loop: true },
            "walk-left-up": { from: 44, to: 47, loop: true },
            "walk-up": { from: 48, to: 51, loop: true },
            "walk-right-up": { from: 52, to: 55, loop: true },
            "walk-right": { from: 56, to: 59, loop: true },
            "walk-right-down": { from: 60, to: 63, loop: true },
         
        }
    });
     k.loadSprite("portbeacon", "./sprites/portbeacons.png",{
        sliceX: 2,
        sliceY: 2,
        anims:{
            "stand": { from: 0, to: 3, loop: true, speed: 5 },            
        }
    });
    k.loadSprite("grass-area", "./sprites/GrassAreaWip.png");
    k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
    k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");
    k.loadFont("vcr", "./fonts/VCR_OSD_MONO_1.001.ttf");
    k.loadFont("minecraft", "./fonts/Minecraft.ttf");
    k.loadSprite("github-logo", "./logos/github-logo.png");
    k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
    k.loadSprite("youtube-logo", "./logos/youtube-logo.png");
    k.loadSprite("bluesky-logo", "./logos/Bluesky-logo.png");
    k.loadSprite("substack-logo", "./logos/substack-logo.png");
    k.loadSprite("javascript-logo", "./logos/js-logo.png");
    k.loadSprite("typescript-logo", "./logos/ts-logo.png");
    k.loadSprite("react-logo", "./logos/react-logo.png");
    k.loadSprite("html-logo", "./logos/html-logo.png");
    k.loadSprite("csharp-logo", "./logos/csharp-logo.png");
    k.loadSprite("css-logo", "./logos/css-logo.png");
    k.loadSprite("python-logo", "./logos/python-logo.png");
    k.loadSprite("email-logo", "./logos/email-logo.png");
    k.loadSprite("debugdash-gd", "./projects/debugdash-gd.png");
    k.loadSprite("sonicbattlerush", "./projects/sonicbattlerush.png");
    k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");

    if (k.width() < 10000){
        store.set(cameraZoomValueAtom, 0.5);
        k.setCamScale(k.vec2(0.5));  
    } else {
        store.set(cameraZoomValueAtom, 0.8);
        k.setCamScale(k.vec2(0.8));
    }

    k.onUpdate(() => {
        const camZoomValue = store.get(cameraZoomValueAtom);
        if (camZoomValue !== k.getCamScale()) k.setCamScale(k.vec2(camZoomValue));
    });

    // Adding tiled background
    const tiledBackground = k.add([
        k.uvquad(k.width(),k.height()),
        k.shader("tiledPattern", () => ({
            u_time: k.time()/ 20,
            u_color1: k.Color.fromHex(PALETTE.color1),
            u_color2: k.Color.fromHex(PALETTE.color2),
            u_speed: k.vec2(1,-1),
            u_aspect: k.width() / k.height(),
            u_size: 5,
        })),
        k.pos(0),
        k.fixed()
    ]);

    // Auto resize tiles
    k.onResize(() => {
        tiledBackground.width = k.width();
        tiledBackground.height = k.height();
        tiledBackground.uniform.u_aspect = k.width() / k.height()
    });

    createArea(k);

    makeSection(
        k, 
        k.vec2(k.center().x + 300, k.center().y - 500), 
        generalData.section1Name, 
        (parent) => {
        const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

            container.add([
                k.text(generalData.header.title, { font: "minecraft", size: 88}),
                k.color(k.Color.fromHex(PALETTE.color2)),
                k.pos(205,0),
                k.opacity(0),
            ]);

            container.add([
                k.text(generalData.header.subtitle, { font: "minecraft", size: 48}),
                k.color(k.Color.fromHex(PALETTE.color2)),
                k.pos(385,100),
                k.opacity(0),
            ]);

            const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

            for (const socialData of socialsData) {
                if (socialData.name === "Email") {
                 makeEmailIcon(
                    k, 
                    socialContainer, 
                    k.vec2(socialData.pos.x, socialData.pos.y), 
                    socialData.imageData, 
                    socialData.name, 
                    socialData.address
                );
                continue;
                }

                makeSocialIcon(
                    k, 
                    socialContainer, 
                    k.vec2(socialData.pos.x, socialData.pos.y), 
                    socialData.imageData,
                    socialData.name, 
                    socialData.link,
                    socialData.description
                );
            }

            makeAppear(k, container);
            makeAppear(k, socialContainer);
        }
    );

    makeSection(
        k, 
        k.vec2(k.center().x - 700, k.center().y + 50), 
        generalData.section2Name, 
        (parent) => {
            const container = parent.add([
                k.opacity(0),
                k.pos(-300, 0)
            ]);

            for (const skillData of skillsData) {
                makeSkillIcon(
                    k, 
                    container, 
                    k.vec2(skillData.pos.x, skillData.pos.y), 
                    skillData.logoData, 
                    skillData.name
                );
            }

            makeAppear(k, container);
        }
    );

    makeSection(
        k, 
        k.vec2(k.center().x + 800, k.center().y + 300), 
        generalData.section3Name, 
        (parent) => {
             const container = parent.add([
                k.opacity(0),
                k.pos(0)
            ]);
            for (const experienceData of experiencesData){
                makeExperienceCard(
                    k, 
                    container, 
                    k.vec2(experienceData.pos.x, experienceData.pos.y), 
                    experienceData.cardHeight,
                    experienceData.roleData
                );
            }

            makeAppear(k, container);
        }
    );

     makeSection(
        k, 
        k.vec2(k.center().x - 100, k.center().y + 600), 
        generalData.section4Name, 
        (parent) => {
            const container = parent.add([
                k.opacity(0),
                k.pos(0)
            ]);
            for (const project of projectsData){
                makeProjectCard(
                    k,
                    container,
                    k.vec2(project.pos.x, project.pos.y),
                    project.data,
                    project.thumbnail
                );
            }

            makeAppear(k, container);
        }
    );


    createPlayer(k, k.vec2(k.center()), 700);
    
}