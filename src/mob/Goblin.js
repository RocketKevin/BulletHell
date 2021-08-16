import Mob from "./Mob.js";

export default class Goblin extends Mob
{
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 200,
            defaultSpeed: 30,
            coinValue: 10,
        })
        // scene.physics.add.existing(this);
        this.setSize(40, 70);
        this.ai = new GoblinController(this, {
            player: this.player,
            animations: "",
        });
        this.time = scene.time;
    }

    update(deltaT)
    {
        this.cd -= deltaT
        if (this.health <= 1000) {
            if (this.ai.getState().getStateName() == "follow") {
                this.ai.changeState("pushup")
            }
            this.cd = 4000;
        }
    }
}

