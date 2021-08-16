import Mob from "./Mob.js";
import GoblinController from "../AI/EnemyAI/GoblinAI/GoblinController.js";

export default class Goblin extends Mob
{
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 200,
            defaultSpeed: 100,
            coinValue: 10,
            defaultHealth: 5000,
        })
        scene.physics.add.existing(this);
        this.setSize(40, 70);
        this.ai = new GoblinController(this, {
            player: scene.player,
            animations: "",
        });
        this.time = scene.time;
    }

    update(deltaT)
    {
        this.cd -= deltaT
        if (this.getHealth() <= 1000) {
            if (this.ai.getState().getStateName() == "follow") {
                this.ai.changeState("pushup")
            }
            this.cd = 4000;
        }
    }
}

