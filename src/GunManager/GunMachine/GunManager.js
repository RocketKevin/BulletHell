import Gun from "./Gun.js";
export default class GunManager{
    #currentGun;//holds current gun object
    #currentGunName;//string 
    #gunDict;//dictionary of (key: string, value: gun)

    constructor(scene, data){
        this.#currentGunName = "none";
        this.#currentGun = null;
        this.#gunDict = new Object();
        this.create(scene, data);
    }

    create(data) {/* abstract method */ }

    changeGun(gunName){
        if(this.#currentGunName==gunName)//already on gun
            return;
        if(gunName in this.#gunDict){//gun exist
            if(this.#currentGun!=null)
                this.#currentGun.onExit();
            this.#currentGun = this.#gunDict[gunName];
            this.#currentGunName = gunName;
            this.#currentGun.onEnter();
        }
        else
            console.log("Can't switch to a gun that does not exist!!!")
    }
    clearGunDict(){
        this.#gunDict = new Object();
    }
    addGun(gunObject){
        if(!(gunObject.getGunName() in this.#gunDict)){//if gun is not in dictionary 
            this.#gunDict[gunObject.getGunName()] = gunObject;
        }
    }
    deleteGun(){
        if(gunObject.getGunName() in this.#gunDict){//if gun is in dictionary
            delete this.#gunDict[gunObject.getGunName()];
        }
    }
    getCurrentGun(){
        return this.#currentGun;
    }
    update(deltaT){
        if(this.#currentGun!=null)
            this.#currentGun.update(deltaT);
    }
    
}