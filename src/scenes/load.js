import { final } from "../final.js";
export class load extends Phaser.Scene{
    constructor(){
        super({
            key: final.SCENES.LOAD
        })
    }
    init(){

    }
    preload(){
        this.game.canvas.style = "margin: auto; display: block;";
        this.load.image("menubackground", "../assets/menubackground.png");
        this.load.image("title", "../assets/title.png");
        this.load.image("playbutton", "../assets/playbutton.png");
        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })
    }
    create(){
        this.scene.start(final.SCENES.MENU);
    }
}