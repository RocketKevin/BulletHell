export class Terrain {
    #map
    #tileset
    #terrainLayer
    #scene
    #spawnObject
    #doorObject
    /**
     * Creates an empty terrain. A starting point where the methods will build on it.
     * @param {Object} scene - The scene where terrain is created.
     */
    constructor(scene) {
        scene.add.existing(this);
        this.#scene = scene;
        this.initalize();
    }
    initalize() {
        this.#map = null;
        this.#tileset = [];
        this.#terrainLayer = [];
        this.#spawnObject = null;
        this.#doorObject = null;
    }
    getDoorInfo() {
        return this.#doorObject;
    }
    getSpawnInfo() {
        return this.#spawnObject;
    }
    getMapColliables() {
        return this.#terrainLayer;
    }
    getMap() {
        return this.#map;
    }
    setTerrainMap(mapName) {
        let ObjectsFromJson = this.#scene.cache.json.get("MapName").maps;
        //Check if mapName isn't listed
        for(let i = 0; i < ObjectsFromJson.length; i++)
            if(mapName === ObjectsFromJson[i].mapName)
                this.#map = this.#scene.add.tilemap(mapName);
        if(this.#map === null)
            console.log("Map not found!");
    }

    setTileSets(tilesetName) {
        let ObjectsFromJson = this.#scene.cache.json.get(tilesetName).object;
        if(this.#map != null) {
            for(let i = 0; i < ObjectsFromJson.length; i++)
                for(let j = 0; j < this.#map.tilesets.length; j++)
                    if(ObjectsFromJson[i].filename === this.#map.tilesets[j].name)
                        this.#tileset.push(this.#map.addTilesetImage(ObjectsFromJson[i].filename, ObjectsFromJson[i].key));
        }
        else
            console.log("Map not found!");
    }

    setLayers() {
        if(this.#map != null)
            for(let i = 0; i < this.#map.layers.length; i++) {
                this.#terrainLayer.push(this.#map.createLayer(this.#map.layers[i].name, this.#tileset, 0, 0));
                if(this.#terrainLayer[i].layer.name === "Above")
                    this.#terrainLayer[i].setDepth(2);
            }
        else
            console.log("Map not found!");
    }

    setEventLayers() {
        if(this.#map != null) {
                    //Set Spawn
            for(let i = 0; i < this.#map.objects[0].objects.length; i++)
                if(this.#map.objects[0].objects[i].name === "Spawn"){
                    this.#spawnObject = this.#map.createFromObjects("Objects", {name: "Spawn"}, '');
                    this.#spawnObject[0].setVisible(false);
                }
            //Set Transition
            this.#doorObject = this.#map.createFromObjects("Objects", {name: "Door"}, '');
            this.#doorObject.map((sprite) => {
                this.#scene.physics.add.existing(sprite);
                sprite.setVisible(false);
            });
        } else
            console.log("Map not found!");
    }
}