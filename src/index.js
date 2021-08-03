import { load } from "./scenes/load.js";
import { menu } from "./scenes/menu.js";
import { play } from "./scenes/play.js";
import { controls } from "./scenes/controls.js"
import { credits } from "./scenes/credits.js"
var game = new Phaser.Game({
    scene: [load, menu, play, controls, credits],
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
});
// function preload() {
//     game.canvas.style = "margin: auto; display: block; margin-top: 5%;";

//     this.load.image('sky', 'assets/ground.png');
//     //this.load.setBaseURL('http://labs.phaser.io');
//     this.load.image('logo', 'assets/sprites/phaser3-logo.png');
//     this.load.image('red', 'assets/particles/red.png');
// }

// function create() {
//     this.add.image(400, 300, 'sky');

//     var particles = this.add.particles('red');

//     var emitter = particles.createEmitter({
//         speed: 100,
//         scale: { start: 1, end: 0 },
//         blendMode: 'ADD'
//     });

//     var logo = this.physics.add.image(400, 100, 'logo');

//     logo.setVelocity(100, 200);
//     logo.setBounce(1, 1);
//     logo.setCollideWorldBounds(true);

//     emitter.startFollow(logo);
// }