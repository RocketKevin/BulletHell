import { final } from "../final.js";
export class menu extends Phaser.Scene{
    constructor(){
        super({
            key: final.SCENES.MENU
        })
    }
    init(data){
        console.log(data);
    }
    create(){
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.1, "title").setDepth(1);
        this.add.image(0,0, "menubackground").setOrigin(0).setDepth(0);
    }
}