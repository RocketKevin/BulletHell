export class Camera {
    constructor(scene, sprite, map) {
        this.userCamera = scene.cameras.main; 
        this.userCamera.startFollow(sprite);
        this.userCamera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }
}