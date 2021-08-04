import { load } from "./scenes/load.js";
import { menu } from "./scenes/menu.js";
import { play } from "./scenes/play.js";
import { controls } from "./scenes/controls.js"
import { credits } from "./scenes/credits.js"
import { SceneHolder } from "./scenes/map.js";
var config = {
    scene: [load, menu, play, SceneHolder, controls, credits],
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%',
    }
};
var game = new Phaser.Game(config);
window.addEventListener('resize', function (event) {
    game.width = window.innerWidth;
    game.height = window.innerHeight; 
}, false);