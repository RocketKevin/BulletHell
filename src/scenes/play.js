import { final } from "../final.js";
export class play extends Phaser.Scene {
    imageDude = Phaser.GameObjects.Sprite;
    keyboard = Object;
    constructor() {
        super({
            key: final.SCENES.PLAY
        })
    }
    preload() {
        this.anims.create({
            key: "right",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [6,7,8,7]
            })
        })
        this.anims.create({
            key: "left",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [5,4,3,4]
            })
        })
        this.anims.create({
            key: "up",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [9,10,11,10]
            })
        })
        this.anims.create({
            key: "down",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [0,1,2,1]
            })
        })
    }
    create() {
        var dude = (this.imageDude = this.add.sprite(50, 100, "dude").setScale(2));
        //dude.play("right");
        window.dude = dude;
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
    }
    update(time, delta) {
        if(this.keyboard.D.isDown === true) {
            dude.x = dude.x + 64 * (delta / 1000);
            dude.play("right", true);
        }
        if(this.keyboard.A.isDown === true) {
            dude.x = dude.x - 64 * (delta / 1000);
            dude.play("left", true);
        }
        if(this.keyboard.W.isDown === true) {
            dude.y = dude.y - 64 * (delta / 1000);
            dude.play("up", true);
        }
        if(this.keyboard.S.isDown === true) {
            dude.y = dude.y + 64 * (delta / 1000);
            dude.play("down", true);
        }
    }
}