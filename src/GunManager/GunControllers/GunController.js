import GunManager from "../GunMachine/GunManager.js";
import Pistol from "../Guns/pistol.js";
export default class GunController extends GunManager{
    create(scene, data){
        this.player = data.player;
        //console.log("entering create!!!")
        let pistol = new Pistol("Pistol", this, scene);
        this.addGun(pistol);
        scene.physics.add.overlap(scene.mobArray, pistol.getBulletArray(), scene.handleBulletMobCollision);
        scene.physics.add.overlap(scene.mobArray1, pistol.getBulletArray(), scene.handleBulletMobCollision);
        this.changeGun("Pistol");
    }
}