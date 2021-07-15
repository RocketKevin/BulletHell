import { Status } from './Status.js';
import { HitBox } from './HitBox.js';
export class Player {
    constructor(scene, x, y, texture, collidables, location) {
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.status = new Status();
        this.keyboard = scene.input.keyboard.addKeys("W, A, S, D");
        this.sprite.setCollideWorldBounds(true);
        scene.physics.world.bounds.width = location.widthInPixels;
        scene.physics.world.bounds.height = location.heightInPixels;
        this.sprite.setScale(0.5);
        this.sprite.setOrigin(0, 0);
        this.sprite.setFrame("dude1.png");
        this.sprite.setImmovable(true);
        this.sprite.setSize(30, 40);
        this.sprite.setOffset(10, 60);
        scene.physics.add.collider(this.sprite, collidables);
        collidables.setCollisionByProperty({ collides: true });
        this.hitbox = new HitBox(scene, x, y, this.sprite);
        scene.cameras.main.startFollow(this.sprite);
        scene.cameras.main.setBounds(0,0, location.widthInPixels,location.heightInPixels);
    }
    update() {
        if (this.sprite.active === true) {
            if (this.keyboard.D.isDown === true) {
                this.sprite.setVelocityX(128);
            }
            if (this.keyboard.A.isDown === true) {
                this.sprite.setVelocityX(-128);
            }
            if (this.keyboard.W.isDown === true) {
                this.sprite.setVelocityY(-128);
            }
            if (this.keyboard.S.isDown === true) {
                this.sprite.setVelocityY(128);
            }
            if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
                this.sprite.setVelocityX(0);
            }
            if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
                this.sprite.setVelocityY(0);
            }
            if (this.keyboard.A.isDown && this.keyboard.W.isDown) {
                this.sprite.setVelocityY(-90);
                this.sprite.setVelocityX(-90);
            }
            if (this.keyboard.W.isDown && this.keyboard.D.isDown) {
                this.sprite.setVelocityY(-90);
                this.sprite.setVelocityX(90);
            }
            if (this.keyboard.D.isDown && this.keyboard.S.isDown) {
                this.sprite.setVelocityY(90);
                this.sprite.setVelocityX(90);
            }
            if (this.keyboard.A.isDown && this.keyboard.S.isDown) {
                this.sprite.setVelocityY(90);
                this.sprite.setVelocityX(-90);
            }
            //console.log(this.sprite.body.velocity.x);
            if (this.sprite.body.velocity.x > 0) {
                this.sprite.play("right", true);
                this.hitbox.update();
            } else if (this.sprite.body.velocity.x < 0) {
                this.sprite.play("left", true);
                this.hitbox.update();
            } else if (this.sprite.body.velocity.y < 0) {
                this.sprite.play("up", true);
                this.hitbox.update();
            } else if (this.sprite.body.velocity.y > 0) {
                this.sprite.play("down", true);
                this.hitbox.update();
            }
        }
    }
}