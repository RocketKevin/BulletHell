import { final } from "../final.js";
export class controls extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.CONTROLS
        })
    }
    preload() {

    }
    create() {
        this.add.image(0, 0, "menubackground").setOrigin(0).setDepth(0).setScale(2, 1.25);
        var controlmenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "controlmenu").setDepth(1);
        var okay = this.add.image(this.game.renderer.width - 90, this.game.renderer.height - 50, "okaybutton").setDepth(1);
        okay.setInteractive();
        okay.on("pointerup", () => {
            this.scene.start(final.SCENES.MENU);
        })
    }
}