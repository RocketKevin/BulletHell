import { Backpack } from "./Backpack.js";
import { Shop } from "./Shop.js";
export class Hub {
    constructor(scene, hubIcon, hub, hubItemIconOne, hubItemOne, hubItemIconTwo, hubItemTwo) {
        this.state = {
            hub: false,
            backpack: false,
            shop: false,
        };
        //310 x 162
        this.shop = new Shop(scene, hubItemTwo);
        this.backpack = new Backpack(scene, hubItemOne);
        this.hubIcon = scene.add.image(1462, 10, hubIcon).setOrigin(0, 0).setInteractive().setScrollFactor(0);
        this.hubBox = scene.add.image(window.innerWidth - 118 - 10, 155 + 84, hub);
        this.backpackIcon = scene.add.image(window.innerWidth - 202, 128, hubItemIconOne).setInteractive();
        this.shopIcon = scene.add.image(window.innerWidth - 128, 128, hubItemIconTwo).setInteractive();
        this.hubContainer = scene.add.container(0, 0, [this.hubBox, this.backpackIcon, this.shopIcon]);
        this.setStyle(this.hubContainer);
        this.hubContainer.setScrollFactor(0);
        this.hubContainer.setDepth(3);
        this.hubContainer.setVisible(false);
    }
    setStyle(container) {
        for (var i = 0; i < container.list.length; i++) {
            container.list[i].setScrollFactor(0);
        }
    }
    button(scene) {
        this.hubIcon.on("pointerup", () => {
            this.state.hub = !this.state.hub;
            this.hubContainer.setVisible(this.state.hub);
        });
        this.backpackIcon.on("pointerup", () => {
            this.state.backpack = !this.state.backpack;
            this.backpack.setVisible(this.state.backpack);
        });
        this.backpack.create(scene);

        this.shopIcon.on("pointerup", () => {
            this.state.shop = !this.state.shop;
            this.shop.setVisible(this.state.shop);
        })
        this.shop.create(scene);
    }
}