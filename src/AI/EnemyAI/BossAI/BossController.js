import StateMachine from "../../StateMachine/StateMachine.js";
import BossImmortal from "./BossImmortal.js";

export default class BossController extends StateMachine {
    create(sprite, data) {
        this.player = data.player;
        this.sprite = sprite;

        let immortal = new BossImmortal("immortal", this, sprite);
        this.addState(immortal);
    }
}
