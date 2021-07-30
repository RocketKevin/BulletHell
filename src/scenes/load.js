import { final } from "../../final.js";
export class load extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.LOAD
        })
        this.loaded = 0;
    }
    init() {

    }
    preload() {
        this.game.canvas.style = "margin: auto; display: block;";
        this.load.json("ItemProperty", "../assets/items/property_items.json");
        this.load.json("MainMenuProperty", "../assets/mainmenu/property_MainMenuComponent.json");

        this.load.image("BuyButton", "../assets/shopUI_buyButton.png");
        this.load.image("HubIcon", "../assets/HubIcon.png");
        this.load.image("Backpack", "../assets/Backpack.png");
        this.load.image("BackpackIcon", "../assets/BackpackIcon.png");
        this.load.image("ShopIcon", "../assets/ShopIcon.png");
        this.load.image("Shop", "../assets/Shop.png");
        this.load.image("Hub", "../assets/Hub.png");

        this.load.image("menubackground", "../assets/mainmenu/menubackground.jpg");
        this.load.image("title", "../assets/mainmenu/title.png");
        this.load.image("playbutton", "../assets/mainmenu/button_play.png");
        this.load.image("controlbutton", "../assets/mainmenu/button_control.png");
        this.load.image("optionbutton", "../assets/mainmenu/button_option.png");
        this.load.image("creditsbutton", "../assets/mainmenu/button_credit.png");
        this.load.atlas("mainmenu", "../assets/mainmenu/MainMenuComponents.png", "../assets/mainmenu/map_MainMenuComponents.json");

        //this.load.image("yes", "../assets/yes.png");
        //this.load.image("no", "../assets/no.png");
        //this.load.image("confirmation", "../assets/confirmation.png");

        this.load.image("controlmenu", "../assets/controlmenu.png");
        this.load.image("backbutton", "../assets/back.png");
        this.load.image("okaybutton", "../assets/okay.png");

        this.load.atlas("dude", "../assets/dude.png", "../assets/dude.json");
        this.load.atlas(
            "items",
            "../assets/items/items2.png",
            "../assets/items/map_items.json"
        );
        var atlasTexture = this.textures.get('projectiles');
        var frames = atlasTexture.getFrameNames();
        this.load.image("bullet", 'projectiles', frames[0]);
        this.load.atlas(
            "projectiles",
            "../assets/projectiles/projectiles.png",
            "../assets/projectiles/map_projectiles.json"
        );
        this.load.atlas(
            "slime",
            "../assets/monsters/slime.png",
            "../assets/monsters/map_slime.json"
        );
        this.load.atlas(
            "wolf",
            "../assets/monsters/wolve.png",
            "../assets/monsters/map_wolve.json"
        );
        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
            this.loaded = percent;
        })
    }
    create() {
        if (this.loaded === 1)
            this.scene.start(final.SCENES.MENU);
    }
}