import GoblinController from "./GoblinController.js";
import HealthBar from "../../../obj/UI/HealthBar.js";

export class Goblin extends Phaser.Physics.Arcade.Sprite {
    defaultHealth = 5000;
    defaultSpeed = 100;

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.setScale(1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(40, 70);
        this.mobAlive = true;
        this.player = scene.Player;
        this.healthBar = new HealthBar(scene, 0, 0, this.defaultHealth);
        this.healthBar.follow(this);
        this.health = this.defaultHealth;
        this.damage = 200;
        this.speed = this.defaultSpeed;

        this.ai = new GoblinController(this, {
            player: this.player,
            animations: "",
        });
        this.time = scene.time;
    }

    getMobAlive() {
        return this.mobAlive;
    }
    setMobDead() {
        this.mobAlive = false;
        this.healthBar.visible = false;
    }

    reset() {
        this.mobAlive = true;
        this.visible = true;
        this.active = true;
        this.health = this.defaultHealth;
        this.healthBar.visible = true;
        this.ai.changeState("roam");
    }

    preUpdate(time, deltaT) {
        super.preUpdate(time, deltaT);
        this.cd -= deltaT
        if (this.health <= 1000) {
            if (this.ai.getState().getStateName() == "follow") {
                this.ai.changeState("pushup")
            }
            this.cd = 4000;
        }

        this.ai.update(deltaT);

        this.healthBar.currentHealth = this.health;
        this.healthBar.update();
        if (this.active) {
            if (this.health <= 0) {
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.setVelocityX(0);
                this.setVelocityY(0);
            }
        }
    }
}
