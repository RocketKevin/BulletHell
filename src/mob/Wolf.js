import Mob from "./Mob.js";

export default class Wolf extends Mob
{
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 250,
            defaultSpeed: 50,
        })
        this.ai = new WolfController(this, {
            player: this.player,
            animations: "",
        });
        this.cd = 4000;
        this.time = scene.time;
    }

    update(deltaT)
    {
        this.cd -= deltaT
        if ((this.cd - deltaT) <= 0) {
            if (this.ai.getState().getStateName() == "follow") {
                this.ai.changeState("lunge")
            }
            this.cd = 4000;
        }
    }
}