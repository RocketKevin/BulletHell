import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Camera } from "../obj/Camera.js";
import { Hub } from "../obj/Hub.js";
import { Terrain } from "../obj/Terrain.js";
function syncDelay(milliseconds){
    let start = new Date().getTime();
    let end = 0;
    while((end - start) < milliseconds)
        end = new Date().getTime();
}
export class SceneHolder extends Phaser.Scene{
    constructor() {
        super({
            key: final.SCENES.TEST
        })
        this.terrain = {
            map: null,
            width: 0,
            height: 0,
            collidables: []
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
        this.keyboard = this.input.keyboard.addKeys("E");
    }
    create() {
        this.test = new Terrain(this); 
        this.terrainConfig("test");
        syncDelay(10);
        this.player = new Player(this, 0, 0, "dude", this.terrain.collidables);
        syncDelay(10);
        if(this.spawn != null)
            this.player.respawn(this.spawn[0].x, this.spawn[0].y);  
        syncDelay(10);
        this.camera = new Camera(this, this.player, this.terrain.map);
        syncDelay(10);
        this.Hub = new Hub(this, "Hub", "Backpack", "Shop");
        syncDelay(10);
        this.player.updateScene(this);
        syncDelay(10); 
        this.collidors();        
    }
    update(time, delta) {
        if(this.terrain.map != null) {
            this.terrain.width = this.terrain.map.widthInPixels;
            this.terrain.height = this.terrain.map.heightInPixels;
            this.physics.world.setBounds(0, 0, this.terrain.width, this.terrain.height);
        }
        if(this.player != null)
            this.player.update(delta);
    }
    terrainConfig(mapName) {
        this.test.setTerrainMap(mapName);
        this.test.setTileSets("TileSetName");
        this.test.setLayers();
        this.test.setEventLayers();
        //These need to be fixed
        this.terrain.collidables = this.test.getMapColliables();
        this.spawn = this.test.getSpawnInfo();  
        this.terrain.map = this.test.getMap();
        this.doorEvent = this.test.getDoorInfo();
    }
    loadWorld() {
        this.terrainConfig(this.levelData.mapName);
        for(var i = 0; i < this.terrain.map.objects[0].objects.length; i++) {
            var tempX = this.terrain.map.objects[0].objects[i].x;
            var tempY = this.terrain.map.objects[0].objects[i].y;
            if(this.OuterDoorId == this.terrain.map.objects[0].objects[i].id) { 
                this.player.respawn(tempX, tempY);
            }
        }
        this.camera = new Camera(this, this.player, this.terrain.map);
        this.collidors();
    }
    destroyWorld() {
        this.test.initalize();
        this.terrain.map.destroy();
        this.terrain = {
            map: null,
            width: 0,
            height: 0,
            collidables: []
        };
        this.mobArray = null;
        this.camera = null;
        for(var i = 0; i < this.doorEvent.length; i++)
            this.doorEvent[i].destroy();
        this.doorEvent = [];
        this.spawn = null;
        this.physics.world.colliders.destroy();
    }
    createTerrain(mapName) {
        var ObjectsFromJson = this.cache.json.get("TileSetName").object;

        this.terrain.map = this.add.tilemap(mapName);

        var tileset = [];
        for(var i = 0; i < ObjectsFromJson.length; i++) {
            for(var j = 0; j < this.terrain.map.tilesets.length; j++)
                if(ObjectsFromJson[i].filename === this.terrain.map.tilesets[j].name)
                    tileset.push(this.terrain.map.addTilesetImage(ObjectsFromJson[i].filename, ObjectsFromJson[i].key));
        };

        for(var i = 0; i < this.terrain.map.layers.length; i++) {
            this.terrain.collidables.push(this.terrain.map.createLayer(this.terrain.map.layers[i].name, tileset, 0, 0));
            if(this.terrain.collidables[i].layer.name === "Above") {
                this.terrain.collidables[i].setDepth(1);
            }
        }
        
        for(var i = 0; i < this.terrain.map.objects[0].objects.length; i++) {
            if(this.terrain.map.objects[0].objects[i].name === "Spawn"){
                this.spawn = this.terrain.map.createFromObjects("Objects", {name: "Spawn"}, '');
                this.spawn[0].setVisible(false);
            }
        }
        this.doorEvent = this.terrain.map.createFromObjects("Objects", {name: "Door"}, '');
        this.doorEvent.map((sprite) => {
            this.physics.add.existing(sprite);
            sprite.setVisible(false);
        });
    }
    collidors() {
        this.player.collidablesTerrain(this, this.terrain.collidables);
        for(var i = 0; i < this.doorEvent.length; i++) {
            //console.log(this.doorEvent[i]);
            this.physics.add.overlap(this.player, this.doorEvent[i], this.testing, null, this);
        }
    }
    testing(player, door) {
        if (this.keyboard.E.isDown) {
            if(!door.data.list.Lock) {
                for(var i = 0; i < this.terrain.map.objects[0].objects.length; i++) {
                    if(door.data.list.Link === this.terrain.map.objects[0].objects[i].id)
                        this.player.respawn(this.terrain.map.objects[0].objects[i].x, this.terrain.map.objects[0].objects[i].y);
                    else if(door.data.list.Link.length > 1) {
                        this.OuterDoorId = door.data.list.OuterDoorId;
                        this.levelData = this.cache.json.get(door.data.list.Link);
                        setTimeout(() => {  
                            this.destroyWorld();
                            this.loadWorld(); 
                        }, 2000);
                    }  
                }
            } else
                console.log(door.data.list.Message);
        }
        this.keyboard.E.isDown = false;
    }
    destroyTerrain() {
        this.terrain.map = null;
        for(var i = 0; i < this.terrain.collidables.length; i++)
            this.terrain.collidables.pop();
    }
    getCamera() {
        return this.camera;
    }
    getPlayer() {
        return this.player;
    }
    getMobArray() {
        return this.mobArray;
    }
    getUserInterface() {
        return this.userInterface;
    }
    getDialog() {
        return this.dialog;
    }
    getArrayOfMembers() {
        var arrayOfMembers = [];
        for(var key in this) {
            arrayOfMembers.push({name: key, value: this[key]});
        }
        return arrayOfMembers;
    }
    setCamera(camera) {
        this.camera = camera;
    }
    setPlayer(player) {
        this.player = player;
    }
    setMobArray(mobArray) {
        this.mobArray = mobArray;
    }
    setUserInterface(userInterface) {
        this.userInterface = userInterface;
    }
    setDialog(dialog) {
        this.dialog = dialog;
    }
}