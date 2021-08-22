import Mob from "./Mob.js";
import BossController from "../AI/EnemyAI/BossAI/BossController.js";
import BossGunController from "../AI/EnemyAI/BossAI/BossGunController.js";

export default class Boss extends Mob {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 200,
            defaultSpeed: 100,
            coinValue: 1000,
            defaultHealth: 500000,
        })
        this.ai = new BossController(this, {
            player: scene.player,
            animations: "",
        });
        this.time = scene.time;
        this.updateScene(scene)
    }
    updateScene(scene) {
        this.gunController = new BossGunController(scene, { boss: this });
    }
    update(deltaT) {
        // this.cd -= deltaT
        if (this.gunController != null) {
            this.gunController.update(deltaT);
        }
    }

}

