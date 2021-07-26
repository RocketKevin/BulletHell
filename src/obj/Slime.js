import EnemyController from "../AI/EnemyAI/EnemyController.js";
import HealthBar from "./UI/HealthBar.js";

export class Slime extends Phaser.Physics.Arcade.Sprite {
    defaultHealth = 500;
    defaultSpeed = 1000;

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.mobAlive = true;
        this.player = scene.Player;
        console.log("here")
        //this = scene.physics.add.sprite(x, y, sprite);
        //this.spawnX = x;
        //this.spawnY = y;
        this.healthBar = new HealthBar(scene, 0, 0, this.defaultHealth);
        this.healthBar.follow(this);
        this.health = this.defaultHealth;
        this.damage = 100;

        this.ai = new EnemyController(this, {player: this.player,
                                            animations: "",
                                            });
        this.scale = Math.random()*5 + 1;
        this.speed = this.defaultSpeed/this.scale;
        this.setScale(this.scale);
                                        
    }

    getMobAlive() {
        return this.mobAlive;
    }
    setMobDead() {
        this.mobAlive = false;
        this.healthBar.visible = false;
        //this.ai.changeState("dead");
    }

    reset() {
        this.mobAlive = true;
        this.visible = true;
        this.active = true;
        this.health = this.defaultHealth;
        this.healthBar.visible = true;
        //this.ai.changeState("");
    }

    preUpdate(time, deltaT) {//movement and stuff
        super.preUpdate(time, deltaT);

        this.ai.update(deltaT);

        this.healthBar.currentHealth = this.health;
        this.healthBar.update();
        //console.log("This mob is updating")
        if (this.active) {
            // let velocityX = this.player.getX() - this.body.x;
            // let velocityY = this.player.getY() - this.body.y;

            // let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            // velocityX = velocityX / distance * this.speed;
            // velocityY = velocityY / distance * this.speed;

            // this.setVelocityX(velocityX);
            // this.setVelocityY(velocityY);
            // if (Math.abs(velocityY) < Math.abs(velocityX)) {
            //     if (this.body.velocity.x > 0) {
            //         this.play("slime_right", true);
            //         this.setVelocityX(this.body.velocity.x)
            //     } else if (this.body.velocity.x < 0) {
            //         this.play("slime_left", true);
            //         this.setVelocityX(this.body.velocity.x)
            //     }
            // }

            // else if (Math.abs(velocityX) <= Math.abs(velocityY)) {
            //     // if (Math.abs(velocityX) <= this.speed / 2) {
            //     if (this.body.velocity.y < 0) {
            //         this.play("slime_up", true);
            //         this.setVelocityY(this.body.velocity.y)
            //     } else if (this.body.velocity.y > 0) {
            //         this.play("slime_down", true);
            //         this.setVelocityY(this.body.velocity.y)
            //     }
            // }

            if (this.health <= 0) {
                this.setVelocityX(0);
                this.setVelocityY(0);

                //this.setVisible(false)
                //this.destroy()
            }
        }
    }
}
