import StateMachine from "../../StateMachine/StateMachine.js";
import BossFollow from "../BossAI/BossFollow.js";
import BossShooting1 from "./BossShooting1.js";

export default class BossController extends StateMachine {
    create(sprite, data) {
        this.player = data.player;
        this.sprite = sprite;

        let follow = new BossFollow("follow", this, sprite);
        this.addState(follow);

        this.changeState("follow");
    }
}
