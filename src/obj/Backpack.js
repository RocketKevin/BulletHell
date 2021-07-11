export class Backpack {
    constructor(scene, texture) {
        this.array = [];
        this.backpack = scene.add.image(window.innerWidth - 165, 486, texture);
        this.backpack.setInteractive();
        this.backpackContainer = scene.add.container(0,0, [this.backpack]); 
        this.backpackContainer.setScrollFactor(0);
        this.backpackContainer.setDepth(3);
        this.backpackContainer.setVisible(false);
        this.backpackContainer.setSize(this.backpack.width, this.backpack.height);
    }
    setVisible(state) {
        this.backpackContainer.setVisible(state);
    }
    create(scene) {
        scene.input.setDraggable(this.backpack);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    }
    addObjectToBackpack(object) {
        this.backpackContainer.add(object.image);
        this.array.push(object);
    }
}