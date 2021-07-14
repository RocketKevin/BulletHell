export class Shop {
    constructor(scene, texture) {
        this.array = [];
        this.shopbag = scene.add.image(window.innerWidth - 105 - 310, 337, texture).setScrollFactor(0);
        this.shopContainer = scene.add.container(0, 0, [this.shopbag]);
        this.shopContainer.setScrollFactor(0);
        this.shopContainer.setDepth(3);
        this.shopContainer.setVisible(false);
        this.shopContainer.setInteractive(new Phaser.Geom.Rectangle(window.innerWidth - 105 - 310 - (this.shopbag.width / 2), 337 - (this.shopbag.height / 2), this.shopbag.width, this.shopbag.height), Phaser.Geom.Rectangle.Contains);
        this.shopContainer.setName("shop container");
        this.shopbag.setName("shop");

    }
    setVisible(state) {
        this.shopContainer.setVisible(state);
    }
    create(scene) {
        scene.input.setDraggable(this.shopContainer);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.setX(dragX);
            gameObject.setY(dragY);

        });
    }
    addObjectToshop(object) {
        this.shopContainer.add(object.image);
        this.array.push(object);
    }
}