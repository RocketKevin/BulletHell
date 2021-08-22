import Mob from "./Mob.js";
import GoblinController from "../AI/EnemyAI/GoblinAI/GoblinController.js";

export default class Boss extends Mob {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 200,
            defaultSpeed: 100,
            coinValue: 1000,
            defaultHealth: 500000,
        })
        this.ai = new GoblinController(this, {
            player: scene.player,
            animations: "",
        });
        this.time = scene.time;
    }

    update(deltaT) {
        this.cd -= deltaT
        if (this.getHealth() <= ) {
            this.ai.changeState("immortal")
        }
    }
}

