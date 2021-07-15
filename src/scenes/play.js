import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Hub } from "../obj/Hub.js";
import { Backpack } from "../obj/Backpack.js";
import { Gun } from "../obj/Gun.js";
import { Shop } from "../obj/Shop.js"
import { Mob } from "../obj/Mob.js"
import { Slime } from "../obj/Mobs/Slime.js"
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
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [0, 1, 2, 1]
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
        this.pistol = new Gun(100,3000,500, 'dude', this.Player.sprite, this.input, this.physics, this)
        this.ak = new Gun(1000,100000,200, 'bullet', this.Player.sprite, this.input, this.physics, this)

        //mob array
        this.mobArray = this.physics.add.group({
            classType: Mob//constructor(scene, x, y, texture)
        });
        //spawn a dude mob
        this.mobDude = this.mobArray.get(250, 250, 'dude').setScale(5);
        this.mobDude.setBounce(-1);
        this.mobAlive = true;
        //collisions
        this.physics.add.overlap(this.mobArray, this.ak.bullets, this.handleBulletMobCollision, undefined, this);
    }
    handleBulletMobCollision(obj1, obj2){//obj1 is the mob obj 2 is the bullets
        obj2.visible = false;
        obj2.active = false;
        obj2.destroy();
        console.log("abc")
        obj1.health = obj1.health - obj2.damage;
        if(obj1.health<=0&&this.mobAlive){
            obj1.visible = false;
            obj1.active = false;
            console.log("mob killed!")
            this.mobAlive = false;
        }
    }
    update(time, delta) {
        this.Player.update();
        console.log(this.Player.getX());
        this.ak.update(time, delta);
        this.mobArray.children.iterate(child=>{
            child.update();
        })
    }
}