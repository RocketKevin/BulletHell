import StateMachine from "../StateMachine/StateMachine.js";
import Follow from "./Follow.js";
import Idle from "./Idle.js";
import Roam from "./Roam.js";
import DongRoam from "./DongRoam.js"

export default class EnemyController extends StateMachine
{
    create(sprite, data)
    {
        this.player = data.player;
        this.sprite = sprite;

        //add the states.
        let idle = new Idle("idle", this, sprite);
        this.addState(idle);
        let follow = new Follow("follow", this, sprite);
        this.addState(follow);
        let roam = new Roam("roam", this, sprite);
        this.addState(roam);
        let dRoam = new DongRoam("DongRoam", this, sprite);
        this.addState(dRoam);
        //set the starting state.
        this.changeState("idle");
    }
}
