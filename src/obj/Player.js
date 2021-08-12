import { Status } from './Status.js';
import { HitBox } from './HitBox.js';
import GunController from '../GunManager/GunControllers/GunController.js';
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, collidables) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.self_format();
        this.self_physic();

        this.status = new Status();
        this.hitbox = new HitBox(scene, this);
        this.keyboard = scene.input.keyboard.addKeys("W, A, S, D, Q");
        this.collidablesTerrain(scene, collidables);
    }
    collidablesTerrain(scene, collidables) {
        for (var i = 0; i < collidables.length; i++) {
            scene.physics.add.collider(this, collidables[i]);
            collidables[i].setCollisionByProperty({ collides: true });
        }
    }
    getMembers() {
        var arrayOfMembers = [];
        for (var key in this) {
            arrayOfMembers.push({ name: key, value: this[key] })
        }
        return arrayOfMembers;
    }
    self_format() {
        this.setScale(0.5);
        this.setOrigin(0, 0);
        this.setFrame("dude1.png");
        this.setDepth(1);
    }
    self_physic() {
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setSize(30, 40);
        this.setOffset(10, 60);
    }
    updateScene(scene) {
        this.gunController = new GunController(scene, { player: this });
        this.switchGunCoolDown = 2000;
        //console.log(this.gunController.scene.floatText);
    }
    getX() {
        return this.body.x
    }
    getY() {
        return this.body.y
    }
    killPlayer() {
        this.visible = false;
        this.setVisible(false);
        this.active = false;
        this.setVelocityX(0);
        this.setVelocityY(0);
        console.log("you have been slain!");
    }
    respawn(x, y) {
        this.setX(x);
        this.setY(y - this.height / 2);
    }
    update(deltaT) {
        if(this.gunController != null) {
            this.gunController.update(deltaT);
            this.switchGunCoolDown -= deltaT;
            if (this.keyboard.Q.isDown) {
                if (this.switchGunCoolDown <= 0) {
                    this.gunController.nextGun();
                    this.switchGunCoolDown = 2000;
                }
                else {
                    console.log(this.switchGunCoolDown + " ms until gun can be swapped");
                }
                this.keyboard.Q.isDown = false;
            }   
        }
        if (this.active) {
            if (this.keyboard.D.isDown) {
                this.setVelocityX(128);
            }
            if (this.keyboard.A.isDown) {
                this.setVelocityX(-128);
            }
            if (this.keyboard.W.isDown) {
                this.setVelocityY(-128);
            }
            if (this.keyboard.S.isDown) {
                this.setVelocityY(128);
            }
            if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
                this.setVelocityX(0);
            }
            if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
                this.setVelocityY(0);
            }
            if (this.keyboard.A.isDown && this.keyboard.W.isDown) {
                this.setVelocityY(-90);
                this.setVelocityX(-90);
            }
            if (this.keyboard.W.isDown && this.keyboard.D.isDown) {
                this.setVelocityY(-90);
                this.setVelocityX(90);
            }
            if (this.keyboard.D.isDown && this.keyboard.S.isDown) {
                this.setVelocityY(90);
                this.setVelocityX(90);
            }
            if (this.keyboard.A.isDown && this.keyboard.S.isDown) {
                this.setVelocityY(90);
                this.setVelocityX(-90);
            }
            //console.log(this.sprite.body.velocity.x);
            if (this.body.velocity.x > 0) {
                this.play("right", true);
            } else if (this.body.velocity.x < 0) {
                this.play("left", true);
            } else if (this.body.velocity.y < 0) {
                this.play("up", true);
            } else if (this.body.velocity.y > 0) {
                this.play("down", true);
            }
            this.hitbox.update();
        }
    }
}