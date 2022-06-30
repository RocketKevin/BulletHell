import Gun from "../GunMachine/Gun.js";

export default class Sniper extends Gun{
    constructor(gunName, gunManager, scene){
        super(gunName, gunManager, scene);
        this.setCustom("Sniper", "1000", "500", "300", "750", "projectiles");
    }
}