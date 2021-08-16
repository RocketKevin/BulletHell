import SlimeController from "./SlimeController.js";
import HealthBar from "../../../obj/UI/HealthBar.js";

export class Slime extends Phaser.Physics.Arcade.Sprite {
    defaultHealth = 500;
    defaultSpeed = 30;

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.mobAlive = true;
        this.player = scene.player;
        this.coinValue = 2;
        //this = scene.physics.add.sprite(x, y, sprite);
        //this.spawnX = x;
        //this.spawnY = y;
        this.healthBar = new HealthBar(scene, 0, 0, this.defaultHealth);
        this.healthBar.follow(this);
        this.health = this.defaultHealth;
        this.damage = 100;

        this.ai = new SlimeController(this, {
            player: this.player,
            animations: "",
            slimes: [],
        });
        this.speed = this.defaultSpeed;

        // this.scale = Math.random() + 1;
        // this.speed = 2.0*this.defaultSpeed / this.scale;
        // this.setScale(this.scale);

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
        this.speed = this.defaultSpeed;
        this.setScale(1);
        this.ai.reset();
        //this.ai.changeState("");
    }

    preUpdate(time, deltaT) {//movement and stuff
        super.preUpdate(time, deltaT);

        //console.log(`x ${this.x}, y ${this.y}`);

        this.ai.update(deltaT);

        this.healthBar.currentHealth = this.health;
        this.healthBar.update();
        //console.log("This mob is updating")
    }
}
