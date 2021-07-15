import { Mob } from "../Mob.js"
export class Slime extends Mob {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        console.log("here")
        //this.spawnX = x;
        //this.spawnY = y;
        this.health = 500;
        this.damage = 100;
        this.body.velocity.x = 100
        scene.MobArray.add(this);
    }
    animations() {

    }
    update() {//movement and stuff 
        this.setVelocityX(1000);
    }
}