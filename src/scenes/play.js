import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Hub } from "../obj/Hub.js";
import { Backpack } from "../obj/Backpack.js";
import { Gun } from "../obj/Gun.js";
import { Shop } from "../obj/Shop.js"
import { Slime } from "../obj/Slime.js"
export class play extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.PLAY
        })
    }
    preload() {
        this.load.image("Ground", "../assets/tilesets/A2_Ground.png");
        this.load.image("Nature", "../assets/tilesets/C_OutSide_Nature.png");
        this.load.tilemapTiledJSON("lab", "../assets/maps/lab.json");
        this.anims.create({
            key: "right",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [6, 7, 8, 7]
            })
        })
        this.anims.create({
            key: "left",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [5, 4, 3, 4]
            })
        })
        this.anims.create({
            key: "up",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [9, 10, 11, 10]
            })
        })
        this.anims.create({
            key: "down",
            framesRate: 3,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [0, 1, 2, 1]
            })
        })
        this.anims.create({
            key: "slime_up",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [10, 11, 12]
            })
        })
        this.anims.create({
            key: "slime_down",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [4, 5, 6]
            })
        })
        this.anims.create({
            key: "slime_left",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [1, 2, 3]
            })
        })
        this.anims.create({
            key: "slime_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [7, 8, 9]
            })
        })
    }

    create() {
        var lab = this.add.tilemap("lab");
        var terrain = lab.addTilesetImage("A2_Ground", "Ground");
        var terrainTop = lab.addTilesetImage("C_OutSide_Nature", "Nature");
        var terrainPassable = lab.addTilesetImage("C_OutSide_Nature", "Nature");
        var bottomLayer = lab.createLayer("Ground", [terrain], 0, 0);
        var passableLayer = lab.createLayer("Ground2", [terrainPassable], 0, 0);
        var aboveLayer = lab.createLayer("Above", [terrainTop], 0, 0).setDepth(2);

        this.Hub = new Hub(this, "HubIcon", "Hub", "BackpackIcon", "Backpack", "ShopIcon", "Shop");
        this.Player = new Player(this, 50, 100, "dude", passableLayer, lab);
        this.Hub.button(this);
        
        //gun/bullet
        //constructor(bulletSpeed, bulletRange, fireRate, imageName, dude, input, physics, scene)
        this.pistol = new Gun(100, 3000, 500, 'dude', this.Player.sprite, this.input, this.physics, this)
        this.ak = new Gun(1000, 100000, 200, 'bullet', this.Player.sprite, this.input, this.physics, this)

        //mob array
        this.mobArray = this.physics.add.group({
            classType: Slime//constructor(scene, x, y, texture)
        });
        //spawn a dude mob
        // this.mobDude = this.mobArray.get(250, 250, 'slime').setScale(.75);
        this.mobArray.add(new Slime(this, 500, 500, this.Player, 'slime'))
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                // spawn a new apple
                if (this.mobArray.getLength() != 4) {
                    this.mobArray.add(new Slime(this, 500, 500, this.Player, 'slime'))
                    console.log(this.mobArray.getLength())
                }
            },
            loop: true
        })
        // this.mobDude.setBounce(-1);
        //collisions
        this.physics.add.overlap(this.mobArray, this.ak.bullets, this.handleBulletMobCollision, null, this);
        this.physics.add.overlap(this.mobArray, this.Player.hitbox.sprite, this.handleDamage, null, this);
    }

    handleDamage(player, monster) {
        if (this.Player.sprite.alpha == 0.5) return;
        // console.log("hello")
        this.Player.status.hp = this.Player.status.hp - monster.damage
        // console.log(monster)
        // console.log(player)
        if (this.Player.status.hp <= 0) {
            this.Player.killPlayer();
            this.ak = null
        }
        this.invulnerable()
    }

    invulnerable() {
        this.Player.sprite.alpha = 0.5;
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.Player.sprite.alpha = 1 },
            callbackScope: this,
            loop: false
        });
    }

    handleBulletMobCollision(obj1, obj2) {//obj1 is the mob obj 2 is the bullets
        obj2.visible = false;
        obj2.active = false;
        obj2.destroy();
        obj1.health = obj1.health - obj2.damage;
        if (obj1.health <= 0 && obj1.getMobAlive()) {
            console.log(obj1)
            obj1.sprite.body.velocity.x = 0
            obj1.sprite.body.velocity.y = 0
            obj1.setMobDead();
            obj1.setVisible(false);
            obj1.sprite.visible = false;
            obj1.active = false;
            console.log("mob killed!")
            obj1.destroy();
        }
    }
    update(time, delta) {

        this.Player.update();
        if (this.ak != null) {
            this.ak.update(time, delta);
        }
        this.mobArray.children.iterate(child => {
            child.update();
        })
    }


}