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
        this.add.image(this.game.renderer.width / 2, 100, "title").setDepth(1);
        this.add.image(0, 0, "menubackground").setOrigin(0).setDepth(0).setScale(2, 1.25);
        var playbutton = this.add.image(this.game.renderer.width / 2, 220, "playbutton").setDepth(1);
        var controls = this.add.image(this.game.renderer.width / 2, 320, "controlbutton").setDepth(1);
        var options = this.add.image(this.game.renderer.width / 2, 420, "optionbutton").setDepth(1);
        var credits = this.add.image(this.game.renderer.width / 2, 520, "creditsbutton").setDepth(1);
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
        credits.setInteractive();
        credits.on("pointerup", () => {
            this.scene.start(final.SCENES.CREDITS);
        })
    }
}