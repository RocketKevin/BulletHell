import { final } from "../final.js";
export class play extends Phaser.Scene {
    imageDude = Phaser.Physics.Arcade.Sprite;
    keyboard = Phaser.Input.Keyboard.Key;
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
        var dude = (this.imageDude = this.physics.add.sprite(50, 100, "dude").setScale(2));
        //dude.play("right");
        window.dude = dude;
        dude.setCollideWorldBounds(true);
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
    }
    update(time, delta) {
        if(dude.active === true) {
            if(this.keyboard.D.isDown === true) {
                dude.setVelocityX(64);
                dude.play("right", true);
            }
            if(this.keyboard.A.isDown === true) {
                dude.setVelocityX(-64);
                dude.play("left", true);
            }
            if(this.keyboard.W.isDown === true) {
                dude.setVelocityY(-64);
                dude.play("up", true);
            }
            if(this.keyboard.S.isDown === true) {
                dude.setVelocityY(64);
                dude.play("down", true);
            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp) {
                dude.setVelocityX(0);
            }
            if(this.keyboard.W.isUp && this.keyboard.S.isUp) {
                dude.setVelocityY(0);
            }
        }
    }
}