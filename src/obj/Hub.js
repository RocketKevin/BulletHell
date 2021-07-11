import { Backpack } from "./Backpack.js";
export class Hub{
    constructor(scene, hubIcon, hub, hubItemIconOne, hubItemOne) {
        this.state = {
            hub: false,
            backpack: false,
        };
        this.backpack = new Backpack(scene, hubItemOne);
        this.hubIcon = scene.add.image(1462, 10, hubIcon).setOrigin(0,0).setInteractive().setScrollFactor(0);
        this.hubBox = scene.add.image(window.innerWidth - 118 - 10, 155 + 84, hub);
        this.backpackIcon = scene.add.image(window.innerWidth - 202, 128, hubItemIconOne).setInteractive();
        this.hubContainer = scene.add.container(0,0, [this.hubBox, this.backpackIcon]);
        this.hubContainer.setScrollFactor(0);
        this.hubContainer.setDepth(3);
        this.hubContainer.setVisible(false);
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
    }
}