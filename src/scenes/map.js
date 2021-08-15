import { final } from "../final.js";
import { player } from "../obj/player.js";
import { Camera } from "../obj/Camera.js";
import { Hub } from "../obj/Hub.js";
import { Terrain } from "../obj/Terrain.js";
import { KeyBoard } from "../obj/KeyBoard.js";
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n);
    });
}
export class SceneHolder extends Phaser.Scene{
    constructor() {
        super({
            key: final.SCENES.TEST
        })
        this.terrain = {
            map: null,
            width: 0,
            height: 0
        };
        this.player = null;
        this.mobArray = null;
        this.camera = null;
        this.userInterface = null;
        this.dialog = null;
        this.spawn = null;
        this.doorEvent = [];
        this.cooldown = 2000;
        this.flag = false;
        this.test = null;
    }
    init() {
        this.keyboard = new KeyBoard(this);
    }
    async create() {
        this.test = new Terrain(this); 
        this.player = new player(this);
        this.camera = new Camera();
        this.Hub = new Hub(this, "Hub", "Backpack", "Shop");

        await this.loadWorld("test");

        this.player.updateScene(this);      
    }
    update(time, delta) {
        this.keyboard.update();
        this.physics.world.setBounds(0, 0, this.test.getMapWidth(), this.test.getMapHeight());
        if(this.player != null)
            this.player.update(delta);
        console.log(this.player.x);
    }
    async terrainConfig(mapName) {
        this.test.setTerrainMap(mapName);
        this.test.setTileSets("TileSetName");
        this.test.setLayers();
        this.test.setEventLayers();
        //These need to be fixed
        this.spawn = this.test.getSpawnInfo();  
        this.terrain.map = this.test.getMap();
        this.doorEvent = this.test.getDoorInfo();
    }
    async playerConfig() {
        if(this.spawn != null) {
            //console.log(this.spawn[0].x);
            this.player.respawn(this.spawn[0].x, this.spawn[0].y);  
            // console.log(this.player.x);
            // await delay(5000);
        }
    }
    async cameraConfig() {
        this.camera.setCamera(this);
        this.camera.setFollow(this.player);
        this.camera.setBounds(this.test.getMapWidth(), this.test.getMapHeight());
    }
    async loadWorld(mapName) {
        await this.terrainConfig(mapName);
        await this.playerConfig();
        await this.cameraConfig();
        
        this.collidors();
    }
    async destroyWorld() {
        this.test.initalize();
        this.camera.initalize();
        this.player.initalize();
        this.terrain = {
            map: null,
            width: 0,
            height: 0,
            collidables: []
        };
        this.mobArray = null;
        for(var i = 0; i < this.doorEvent.length; i++)
            this.doorEvent[i].destroy();
        this.doorEvent = [];
        this.spawn = null;
        this.physics.world.colliders.destroy();
    }
    collidors() {
        this.player.collidablesTerrain(this, this.test.getMapColliables());
        for(var i = 0; i < this.doorEvent.length; i++) {
            //console.log(this.doorEvent[i]);
            this.physics.add.overlap(this.player, this.doorEvent[i], this.testing, null, this);
        }
    }
    async testing(player, door) {
        let tempKeyboard = this.keyboard.getKeyboard();
        let data = [];
        data.push(door.data.list.Link);
        data.push(door.data.list.Lock);
        data.push(door.data.list.Message);
        data.push(door.data.list.OuterDoorId);
        if (tempKeyboard.E.isDown) {
            if(!data[1]) {
                for(var i = 0; i < this.terrain.map.objects[0].objects.length; i++) {
                    if(data[0] === this.terrain.map.objects[0].objects[i].id)
                        this.player.respawn(this.terrain.map.objects[0].objects[i].x, this.terrain.map.objects[0].objects[i].y);
                    else if(data[0].length > 1) {
                        this.OuterDoorId = data[3];
                        this.levelData = this.cache.json.get(data[0]);
                        await this.destroyWorld();
                        await this.loadWorld(this.levelData.mapName);
                    }  
                }
            } else
                console.log(data[2]);
        }
        tempKeyboard.E.isDown = false;
    }
}