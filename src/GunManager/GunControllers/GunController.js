import GunManager from "../GunMachine/GunManager.js";
import Pistol from "../Guns/pistol.js";
export default class GunController extends GunManager{
    create(scene, data){
        //console.log("entering create!!!")
        let pistol = new Pistol("Pistol", this, scene);
        this.addGun(pistol);
        this.changeGun("Pistol");
    }
}