export class Mob extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        console.log("here")
        //this.spawnX = x;
        //this.spawnY = y;
        this.health = 500;
        this.damage = 100;
    }
    animations(){

    }
    update(){//movement and stuff 
        this.setVelocityX(50);
    }
}
