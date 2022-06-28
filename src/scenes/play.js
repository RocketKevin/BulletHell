import { final } from "../final.js";
import { player } from "../obj/player.js";
import { Hub } from "../obj/Hub.js";
// import { Slime } from "../AI/EnemyAI/SlimeAI/Slime.js";
import DialogBox from "../obj/UI/DialogBox.js";
import FloatText from "../obj/UI/FloatText.js";
import StatusBar from "../obj/UI/StatusBar.js";
import { Camera } from "../obj/Camera.js";
import Boss from "../mob/Boss.js";
// import { Wolf } from "../AI/EnemyAI/WolfAI/Wolf.js";
// import { Goblin } from "../AI/EnemyAI/GoblinAI/Goblin.js";
import Mob from "../mob/Mob.js";
import Slime from "../mob/Slime.js";
import Goblin from "../mob/Goblin.js";
import Wolf from "../mob/Wolf.js";
import { KeyBoard } from "../obj/KeyBoard.js";
import MobManager from "../mob/MobManager.js";
import UIArea from "../obj/UI/UIArea.js";
import SocketController from "../SocketManager/SocketController.js";
import PartileManager from "../particle/ParticleManager.js";
import RectangleParticle from "../particle/RectangleParticle.js";
import BulletSpark from "../particle/BulletSpark.js";
import { Terrain } from "../obj/Terrain.js";
export class play extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.PLAY
        })
    }
    init() {
        this.keyboard = new KeyBoard(this);
        this.totalKillCount = 0;
        this.bossKillCount = 0;
        this.wave = 1;
    }
    preload() {
        this.load.image("Ground", "../src/assets/tilesets/A2_Ground.png");
        this.load.image("Nature", "../src/assets/tilesets/C_OutSide_Nature.png");
        this.load.tilemapTiledJSON("lab", "../src/assets/maps/lab.json");
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
        this.anims.create({
            key: "wolf_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("wolf", {
                prefix: "wolve",
                suffix: ".png",
                frames: [1, 2, 3, 4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: "wolf_right_lunge",
            framesRate: 1,
            frames: this.anims.generateFrameNames("wolf", {
                prefix: "wolve",
                suffix: ".png",
                frames: [8, 9, 10, 11]
            })
        })
        this.anims.create({
            key: "goblin_pushup",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [44, 45, 46, 47, 48, 47, 46, 45, 44]
            })
        })
        this.anims.create({
            key: "goblin_up",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [22, 23, 24, 25, 26, 27, 28, 29]
            })
        })
        this.anims.create({
            key: "goblin_down",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "0",
                suffix: ".png",
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: "goblin_left",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [33, 34, 35, 36, 37, 38, 39, 40]
            })
        })
        this.anims.create({
            key: "goblin_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [11, 12, 13, 14, 15, 16, 17, 18]
            })
        })
    }

    create() {
        this.terrain = new Terrain(this);
        this.terrain.setTerrainMap("lab");
        this.terrain.setTileSets("TileSetName");
        this.terrain.setLayers();
        this.terrain.setEventLayers();

        this.physics.world.setBounds(0, 0, this.terrain.getMapWidth(), this.terrain.getMapHeight());

        this.Hub = new Hub(this, "Hub", "Backpack", "Shop");
        this.player = new player(this);
        this.player.respawn(50, 100);

        this.Hub.button(this);

        this.textBox = new DialogBox(this, 0, 0);
        this.floatText = new FloatText(this);
        this.userCamera = new Camera();
        this.userCamera.setCamera(this);
        this.userCamera.setFollow(this.player);
        this.userCamera.setBounds(this.terrain.getMapWidth(), this.terrain.getMapHeight());

        this.cameras.main.setZoom(1.25); //sets the zoom of the camera.

        this.ScreenUI = new UIArea(this);
        let camera = this.cameras.main;
        this.ScreenUI.setPosition(camera.width / 2, camera.height / 2); //the postion is the center of the screen.
        this.ScreenUI.setSize(camera.displayWidth, camera.displayHeight); //the width and height matches the camera's transformed width and height.

        this.StatusBar = new StatusBar(this);
        this.ScreenUI.addUI(this.StatusBar, 0, 0, UIArea.ANCHOR.TOPLEFT);

        this.mobManager = new MobManager(this);
        this.mobManager.addMobGroup("slime", Slime);
        this.mobManager.addMobGroup("wolf", Wolf);
        this.mobManager.addMobGroup("goblin", Goblin);
        this.mobManager.addMobGroup("dude", Boss)

        this.particleManager = new PartileManager(this);
        this.particleManager.addParticleGroup("rect", RectangleParticle);
        this.particleManager.addParticleGroup("BulletSpark", BulletSpark);

        this.time.addEvent({
            delay: 300,
            callback: () => {
                if (this.wave === 1) {
                    for (var i=0; i<5; i++) {
                        this.mobManager.spawnMob("slime", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 2 && this.totalKillCount === 5) {
                    for (var i=0; i<2; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                        this.mobManager.spawnMob("slime", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 3 && this.totalKillCount === 9) {
                    for (var i=0; i<4; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 4 && this.totalKillCount === 13) {
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.wave += 1;
                }
                if (this.wave === 5 && this.totalKillCount === 14) {
                    this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.wave += 1;
                }
                if (this.wave === 6 && this.totalKillCount === 17) {
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    for (var i=0; i<9; i++) {
                        this.mobManager.spawnMob("slime", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 7 && this.totalKillCount === 28) {
                    for (var i=0; i<6; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.wave += 1;
                }
                if (this.wave === 8 && this.totalKillCount === 35) {
                    for (var i=0; i<4; i++) {
                        this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 9 && this.totalKillCount === 39) {
                    for (var i=0; i<10; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
            },
            loop: true
        });

        this.test = this.add.image(300, 300, "BuyButton").setOrigin(0).setDepth(10).setScrollFactor(0).setInteractive();
        this.test.on("pointerup", () => {
            this.scene.start(final.SCENES.TEST);
        });
        this.player.updateScene(this);
        this.worldHeightInPixels = this.terrain.getMapHeight();
        this.worldWidthInPixels = this.terrain.getMapWidth();

        //add collision handlers for the mobs.
        this.mobManager.addOverlapAll(this.player.hitbox.sprite, this.handleMobPlayerCollision);
        let gunDict = this.player.gunController.getGunDict();
        for (let key in gunDict)
            this.mobManager.addOverlapAll(gunDict[key].getBulletArray(), this.handleMobBulletCollision);

        //console.log(this);
        this.socketControl = new SocketController(this);
    }

    handleMobPlayerCollision(none, monster) {
        if (this.player.alpha == 0.5) return;
        if (monster.active) {
            this.player.status.hp = this.player.status.hp - monster.getDamage();
            if (this.player.status.hp <= 0) {
                this.player.killplayer();
                this.player = new player(this);
                this.userCamera.setFollow(this.player);
                this.player.respawn(50, 100);
                this.player.updateScene(this);
                this.mobManager.addOverlapAll(this.player.hitbox.sprite, this.handleMobPlayerCollision);
                let gunDict = this.player.gunController.getGunDict();
                for (let key in gunDict)
                    this.mobManager.addOverlapAll(gunDict[key].getBulletArray(), this.handleMobBulletCollision);
                this.ak = null
            }
            this.invulnerable()
        }

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

    /**
     * 
     * @param {Mob} obj1 - The mob.
     * @param {Player} obj2 - The player.
     */
    handleMobBulletCollision(obj1, obj2) {//obj1 is the mob obj 2 is the bullets
        //console.log(obj1)
        //console.log(obj2)
        if (obj1.active && obj2.active) {
            obj2.visible = false;
            obj2.active = false;
            obj1.setHealth(obj1.getHealth() - obj2.damage);
            this.floatText.showText(obj1.x - obj1.width / 4, obj1.y - obj1.height / 2, `${obj2.damage}`);
            this.particleManager.sprayParticle("BulletSpark", obj2.x, obj2.y, {
                amount: Math.log10(obj2.damage),
                directionVector: {
                    x: -obj2.body.velocity.x,
                    y: -obj2.body.velocity.y,
                },
                spreadAngle: 30,
                speed: 10 * Math.log2(obj2.damage),
            });
            obj2.destroy();
            if (obj1.getHealth() <= 0 && obj1.getMobAlive()) {

                obj1.body.velocity.x = 0
                obj1.body.velocity.y = 0
                obj1.setMobDead();
                //obj1.setVisible(false);
                obj1.visible = false;
                obj1.active = false;
                this.player.status.coins += obj1.getCoinValue();
                //play some particles.
                let num = Math.log2(obj1.getDefaultHealth());
                this.particleManager.sprayParticle("rect", obj1.x, obj1.y, {
                    amount: num,
                    speed: 30,
                    directionVector: {
                        x: 0,
                        y: 1,
                    },
                    spreadAngle: 270,
                });
                this.totalKillCount += 1;
                console.log("Killcount is:" + this.totalKillCount);
                console.log(obj1.getCoinValue());
            }
        }
    }

    createNewPlayer() {
        return new player(this);
    }

    update(time, delta) {
        this.keyboard.update();
        this.player.update(delta);
        if(this.player.active) {
            this.StatusBar.health = this.player.status.health;
        }
        this.StatusBar.update()
    }
}
