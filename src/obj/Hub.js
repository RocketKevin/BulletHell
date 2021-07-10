export class Hub{
    constructor(scene, texture, hubItemIconOne, hubItemOne) {
        this.hubBox = scene.add.image(window.innerWidth - 118 - 10, 155 + 84, texture);
        this.backpack = scene.add.image(window.innerWidth - 202, 128, hubItemIconOne);
        this.hubContainer = scene.add.container(0,0, [this.hubBox, this.backpack]);
        this.hubContainer.setScrollFactor(0);
        this.hubContainer.setDepth(3);
        this.hubContainer.setVisible(false);
    }
    setVisible(state) {
        this.hubContainer.setVisible(state);
    }
}