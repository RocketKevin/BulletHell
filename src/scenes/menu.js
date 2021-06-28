import { final } from "../final.js";
export class menu extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.MENU
        })
    }
    init(data) {
        console.log(data);
    }
    create() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.1, "title").setDepth(1);
        this.add.image(0, 0, "menubackground").setOrigin(0).setDepth(0);
        var playbutton = this.add.image(this.game.renderer.width / 2, 200, "playbutton").setDepth(1);
        var controls = this.add.image(this.game.renderer.width / 2, 300, "controlbutton").setDepth(1);
        var options = this.add.image(this.game.renderer.width / 2, 400, "optionbutton").setDepth(1);
        var quit = this.add.image(this.game.renderer.width / 2, 500, "quitbutton").setDepth(1);
        playbutton.setInteractive();
        playbutton.on("pointerup", () => {
            this.scene.start(final.SCENES.PLAY);
        })
        controls.setInteractive();
        controls.on("pointerup", () => {
            this.scene.start(final.SCENES.CONTROLS);
        })
        options.setInteractive();
        options.on("pointerup", () => {
            this.scene.start(final.SCENES.OPTIONS);
        })
        quit.setInteractive();
        quit.on("pointerup", () => {
            this.scene.start(final.SCENES.QUIT);
        })
    }
}