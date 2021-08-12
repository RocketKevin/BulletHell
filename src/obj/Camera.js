export class Camera {
    constructor(scene, sprite, map) {
        this.userCamera = scene.cameras.main; 
        this.userCamera.startFollow(sprite);
        if(map != null) {
            this.userCamera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        }
    }
}