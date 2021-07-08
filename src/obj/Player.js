import { Status } from './Status.js'
export class Player{

    constructor(scene,x, y, texture, collidables) {
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.status = new Status();
        this.keyboard = scene.input.keyboard.addKeys("W, A, S, D");
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setScale(0.5);
        this.sprite.setOrigin(0,0);
        this.sprite.setFrame("dude1.png");
        this.sprite.setImmovable(true);
        scene.physics.add.collider(this.sprite, collidables);
        collidables.setCollisionByProperty({collides:true});
    }
    update() {
        if(this.sprite.active === true) {
            if(this.keyboard.D.isDown === true) {
                this.sprite.setVelocityX(64);
                //dude.play("right", true);
            }
            if(this.keyboard.A.isDown === true) {
                this.sprite.setVelocityX(-64);
                //dude.play("left", true);
            }
            if(this.keyboard.W.isDown === true) {
                this.sprite.setVelocityY(-64);
                //dude.play("up", true);
            }
            if(this.keyboard.S.isDown === true) {
                this.sprite.setVelocityY(64);
                //dude.play("down", true);
            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp) {
                this.sprite.setVelocityX(0);
            }
            if(this.keyboard.W.isUp && this.keyboard.S.isUp) {
                this.sprite.setVelocityY(0);
            }
            console.log(this.sprite.body.velocity.x);
            if (this.sprite.body.velocity.x > 0) {
                this.sprite.play("right", true);
                console.log("true");
            } else if (this.sprite.body.velocity.x < 0) {
                this.sprite.play("left", true);
            } else if (this.sprite.body.velocity.y < 0) {
                this.sprite.play("up", true);
            } else if (this.sprite.body.velocity.y > 0) {
                this.sprite.play("down", true);
            }
        }
    }
}