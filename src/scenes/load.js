import { final } from "../final.js";
export class load extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.LOAD
        })
    }
    init() {

    }
    preload() {
        this.game.canvas.style = "margin: auto; display: block;";
        this.load.spritesheet("Generic Male NPCs", "../assets/Generic Male NPCs.png", {frameHeight: 64, frameWidth: 64});
        this.load.atlas("Generic Male NPCs", "../assets/Generic Male NPCs.png", "../assets/Generic Male NPCs.json")
        this.load.image("menubackground", "../assets/menubackground.png");
        this.load.image("title", "../assets/title.png");
        this.load.image("playbutton", "../assets/playbutton.png");
        this.load.image("controlbutton", "../assets/controlbutton.png")
        this.load.image("optionbutton", "../assets/optionbutton.png")
        this.load.image("quitbutton", "../assets/quitbutton.png")
        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })
    }
    create() {
        this.scene.start(final.SCENES.MENU);
    }
}