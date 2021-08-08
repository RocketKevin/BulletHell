export class Terrain {

    #map
    #tileset
    #terrainLayer
    #objectLayer
    #scene
    /**
     * Creates an empty terrain. A starting point where the methods will build on it.
     */
    constructor(scene) {
        scene.add.existing(this);
        this.#scene = scene;
        this.#map = null;
        this.#tileset = null;
        this.#terrainLayer = null;
        this.#objectLayer = null;
    }

    setTerrainMap(mapName) {
        this.#map = this.#scene.add.tilemap(mapName);
    }
}