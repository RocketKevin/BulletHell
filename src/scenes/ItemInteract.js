export class ShopItemInteract {
    constructor(item, scene, x, y) {
        this.scene = scene;
        this.panel = scene.add.image(x, y, "BuyButton").setOrigin(0);
        this.setConfig();
        this.events(item);
    }
    setConfig() {
        this.panel.setX(this.panel.x - this.panel.width/2);
        this.panel.setY(this.panel.y - this.panel.height/2);
        this.panel.setDepth(3);
        this.panel.setVisible(false);
        this.panel.setInteractive();
    }
    events(item) {
        this.panel.on("pointerup", () => {
            var backpack = this.scene.Hub.backpack.array;
            //var backpackContainer = this.scene.Hub.backpack.backpackContainer;
            console.log(backpackContainer);
            for(var i = 0; i < backpack.length; i++) {
                if(backpack[i] === item) {
                    backpack[i].amount++;
                }
            }
            if(backpack[backpack.length - 1] !== item){
                backpack.push(item);
                //backpackContainer.list.add(item.image);
            }
        });
    }
}