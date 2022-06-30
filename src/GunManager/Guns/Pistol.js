import Gun from "../GunMachine/Gun.js";

export default class Pistol extends Gun{
    constructor(gunName, gunManager, scene){
        super(gunName, gunManager, scene);
        this.setCustom("Pistol", "500", "250", "150", "300", "projectiles");
    }
}