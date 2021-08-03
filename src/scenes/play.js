import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Hub } from "../obj/Hub.js";
import { Backpack } from "../obj/Backpack.js";
import { Gun } from "../obj/Gun.js";
import { Shop } from "../obj/Shop.js"
import { Slime } from "../obj/Slime.js"
import DialogBox from "../obj/DialogBox.js";
import FloatText from "../obj/FloatText.js";
import { Terrain } from "../obj/Terrain.js";
import { Camera } from "../obj/Camera.js";
export class play extends Phaser.Scene {
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
        //this.terrainLayout = new Terrain();
        this.map = this.add.tilemap("lab");
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        var lab = this.map;
        var terrain = lab.addTilesetImage("A2_Ground", "NatureGround");
        var terrainTop = lab.addTilesetImage("C_OutSide_Nature", "Outdoor");
        var terrainTop2 = lab.addTilesetImage("A4_Walls_2", "BuildingWall");
        var terrainPassable = lab.addTilesetImage("C_OutSide_Nature", "Outdoor");
        var bottomLayer = lab.createLayer("Ground", [terrain], 0, 0);
        var passableLayer = lab.createLayer("Ground2", [terrainPassable, terrainTop2], 0, 0);
        var aboveLayer = lab.createLayer("Above", [terrainTop], 0, 0).setDepth(2);

        this.Hub = new Hub(this, "Hub", "Backpack", "Shop");
        //console.log(this.terrainLayout);
        this.player = new Player(this, 50, 100, "dude", [passableLayer], lab);
        //this.Hub.button(this);

        this.textBox = new DialogBox(this, 0, 0);
        this.floatText = new FloatText(this);

        //mob array
        this.mobArray = this.physics.add.group({
            classType: Slime//constructor(scene, x, y, texture)
        });
        this.userCamera = new Camera(this, this.player, this.map); 
        
        //gun/bullet
        //constructor(bulletSpeed, bulletRange, fireRate, imageName, dude, input, physics, scene)
        this.pistol = new Gun(100, 3000, 500, 'dude', this.player, this.input, this.physics, this)
        this.ak = new Gun(1000, 100000, 200, 'bullet', this.player, this.input, this.physics, this)

        //spawn a dude mob
        // this.mobDude = this.mobArray.get(250, 250, 'slime').setScale(.75);
        //this.mobArray.add(new Mob(this, 500, 500, this.Player, 'slime'))
        //this.mobArray.get(500, 500, "slime");
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                // spawn a new apple
                if (this.mobArray.getTotalUsed() < 4) { //if the total number that is active is less than 4.
                    let mob = this.mobArray.get(500, 500, "slime");
                    mob.reset();
                }
            },
            loop: true
        })
        //console.log(this.playerArray);
        this.physics.add.overlap(this.mobArray, this.ak.bullets, this.handleBulletMobCollision, null, this);
        this.physics.add.overlap(this.mobArray, this.player.hitbox.sprite, this.handleDamage, null, this);
        this.test = this.add.image(10, 10, "BuyButton").setOrigin(0).setDepth(10).setScrollFactor(0).setInteractive();
        this.test.on("pointerup", () => {
            this.scene.start(final.SCENES.TEST);
        });
    }

    handleDamage(player, monster) {
        if (this.player.alpha == 0.5) return;
        // console.log("hello")
        this.player.status.hp = this.player.status.hp - monster.damage
        // console.log(monster)
        // console.log(player)
        if (this.player.status.hp <= 0) {
            this.player.killPlayer();
            this.ak = null
        }
        this.invulnerable()
    }

    invulnerable() {
        this.player.alpha = 0.5;
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.player.alpha = 1 },
            callbackScope: this,
            loop: false
        });
    }

    handleBulletMobCollision(obj1, obj2) {//obj1 is the mob obj 2 is the bullets
        console.log(obj1)
        console.log(obj2)
        if(obj1.active && obj2.active)
        {
            obj2.visible = false;
            obj2.active = false;
            obj2.destroy();
            obj1.health = obj1.health - obj2.damage;
            
            this.floatText.showText(obj1.x - obj1.width/4, obj1.y - obj1.height/2, `${obj2.damage}`);

            if (obj1.health <= 0 && obj1.getMobAlive()) {
                
                obj1.body.velocity.x = 0
                obj1.body.velocity.y = 0
                obj1.setMobDead();
                //obj1.setVisible(false);
                obj1.visible = false;
                obj1.active = false;
                console.log("mob killed!")
                this.textBox.showFor("mob was killed, \n good job!!!!", 1000);
                // obj1.destroy();
            }
        }
    }
    update(time, delta) {

        this.player.update();
        if (this.ak != null) {
            this.ak.update(time, delta);
        }
        // this.mobArray.children.iterate(child => {
        //     if(child.active)
        //         child.update();
        // })
    }


}