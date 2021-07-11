import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Hub } from "../obj/Hub.js";
import { Backpack } from "../obj/Backpack.js";
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
        var lab = this.add.tilemap("lab");
        var terrain = lab.addTilesetImage("A2_Ground", "Ground");
        var terrainTop = lab.addTilesetImage("C_OutSide_Nature", "Nature");
        var terrainPassable = lab.addTilesetImage("C_OutSide_Nature", "Nature");
        var bottomLayer = lab.createLayer("Ground", [terrain], 0, 0);
        var passableLayer = lab.createLayer("Ground2", [terrainPassable], 0, 0);
        var aboveLayer = lab.createLayer("Above", [terrainTop], 0, 0).setDepth(2);
        
        this.Hub = new Hub(this, "HubIcon", "Hub", "BackpackIcon", "Backpack");
        this.Player = new Player(this, 50, 100, "dude", passableLayer, lab);
        this.Hub.button(this);
    }
    update(time, delta) {
        this.Player.update();
    }
}