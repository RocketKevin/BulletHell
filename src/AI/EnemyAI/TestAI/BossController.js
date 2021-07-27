import Roam from "../Roam.js";
import Idle from "../Idle.js";
import StateMachine from "../../StateMachine/StateMachine.js";
import DongRoam from "./DongRoam.js";
import BossFollow from "./BossFollow.js";
import BossLunge from "./BossLunge.js";
export default class BossController extends StateMachine{
    create(sprite, data) {
        this.player = data.player;
        this.sprite = sprite;
        this.lungeCD = 2000;

        //add the states.
        let idle = new Idle("idle", this, sprite);
        this.addState(idle);
        let follow = new BossFollow("follow", this, sprite);
        this.addState(follow);
        let roam = new Roam("roam", this, sprite);
        this.addState(roam);
        let lunge = new BossLunge("lunge", this, sprite)
        this.addState(lunge);
        let dRoam = new DongRoam("DongRoam", this, sprite);
        this.addState(dRoam);
        //set the starting state.
        this.changeState("idle");
    }
}
