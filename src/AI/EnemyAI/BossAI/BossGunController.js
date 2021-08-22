import GunManager from "../../../GunManager/GunMachine/GunManager.js";
import BossGun from "./BossGun.js";

export default class BossGunController extends GunManager {
    create(scene, data) {
        this.boss = data.boss;
        this.player = scene.player;
        this.scene = scene;
        //console.log("entering create!!!")
        let pistol = new BossGun("Pistol", this, scene);
        this.addGun(pistol);
        this.changeGun("Pistol");
        // console.log(scene.player)
    }
}