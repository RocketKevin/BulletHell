import { final } from "../final.js";
export class quit extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.QUIT
        })
    }
    init() {
    }
    preload() {
    }
    create() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.1, "title").setDepth(1);
        this.add.image(0, 0, "menubackground").setOrigin(0).setDepth(0);
        var confirmation = this.add.image(this.game.renderer.width / 2, 200, "confirmation").setDepth(1);
        var yes = this.add.image(this.game.renderer.width / 3, 300, "yes").setDepth(1);
        var no = this.add.image(2 * this.game.renderer.width / 3, 300, "no").setDepth(1);
        yes.setInteractive();
        yes.on("pointerup", () => {
            window.close();
        })
        no.setInteractive();
        no.on("pointerup", () => {
            this.scene.start(final.SCENES.MENU);
        })
    }
}